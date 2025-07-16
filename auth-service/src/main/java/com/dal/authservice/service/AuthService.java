package com.dal.authservice.service;

import com.dal.authservice.dto.*;
import com.dal.authservice.exception.AuthException;
import com.dal.authservice.model.PasswordResetToken;
import com.dal.authservice.repository.PasswordResetTokenRepository;
import com.dal.authservice.util.JwtTokenUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.time.LocalDateTime;
import java.util.UUID;

@Service
public class AuthService {

    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    @Autowired
    private PasswordResetTokenRepository passwordResetTokenRepository;

    @Autowired
    private RestTemplate restTemplate;

    @Value("${user.service.url}")
    private String userServiceUrl;

    @Value("${auth.service.url}")
    private String authServiceUrl;

    @Value("${notification.service.url}")
    private String notificationServiceUrl;

    @Value("${frontend.app.url}")
    private String passwordResetUrl;

    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public AuthResponseDTO login(LoginDTO loginDTO) {
        String url = userServiceUrl + "authenticate/" + loginDTO.getEmail(); // Endpoint on user-service
        HttpHeaders headers = new HttpHeaders();
        headers.set("X-Internal-Auth", "internal-secret");
        HttpEntity<Void> entity = new HttpEntity<>(headers);

        ResponseEntity<UserDTO> response = restTemplate.exchange(url, HttpMethod.GET, entity, UserDTO.class);
        headers.clear();

        if (!response.getStatusCode().is2xxSuccessful() || response.getBody() == null) {
            throw new AuthException("Invalid email");
        }
        UserDTO userDTO = response.getBody();

        if (!passwordEncoder.matches(loginDTO.getPassword(), userDTO.getPassword())) {
            throw new AuthException("Invalid password");
        }

        String token = jwtTokenUtil.generateToken(userDTO.getEmail(),userDTO.getRole());

        token = "Bearer " + token;

        AuthResponseDTO authResponseDTO = new AuthResponseDTO();
        authResponseDTO.setToken(token);
        authResponseDTO.setEmail(userDTO.getEmail());
        authResponseDTO.setFirstName(userDTO.getFirstName());
        authResponseDTO.setLastName(userDTO.getLastName());
        authResponseDTO.setRole(userDTO.getRole());
        authResponseDTO.setId(userDTO.getId());
        authResponseDTO.setPhone(userDTO.getPhone());
        authResponseDTO.setCreatedAt(userDTO.getCreatedAt());
        authResponseDTO.setUpdatedAt(userDTO.getUpdatedAt());

        return authResponseDTO;
    }

    public String forgotPassword(ForgotPasswordDTO forgotPasswordDTO) {
        String url = userServiceUrl + "internal/" + forgotPasswordDTO.getEmail();

        ResponseEntity<UserDTO> response = restTemplate.getForEntity(url, UserDTO.class);
        if (!response.getStatusCode().is2xxSuccessful() || response.getBody() == null) {
            throw new AuthException("Invalid email or password");
        }
        UserDTO userDTO = response.getBody();

        String token = UUID.randomUUID().toString();
        LocalDateTime expiryDate = LocalDateTime.now().plusMinutes(15);

        PasswordResetToken resetToken = new PasswordResetToken();
        resetToken.setToken(token);
        resetToken.setEmail(userDTO.getEmail());
        resetToken.setExpiryDate(expiryDate);
        resetToken.setUsed(false);
        passwordResetTokenRepository.save(resetToken);

        String resetLink = passwordResetUrl + "?token=" + token;

        EmailDTO emailDTO = new EmailDTO();
        emailDTO.setSubject("Password Reset Link");
        emailDTO.setBody("Please note that this link is valid for only 15 minutes.\nClick the link below to reset your password:\n" + resetLink);
        emailDTO.setTo(userDTO.getEmail());

        String notificationUrl = notificationServiceUrl + "email";
        ResponseEntity<String> res = restTemplate.postForEntity(notificationUrl, emailDTO, String.class);
        if (!res.getStatusCode().is2xxSuccessful() || res.getBody() == null) {
            throw new RuntimeException("Email could not be sent");
        }

        return "Password reset instructions have been sent to " + userDTO.getEmail();
    }

    public String resetPassword(ResetPasswordDTO resetPasswordDTO) {
        PasswordResetToken tokenEntry = passwordResetTokenRepository.findByTokenAndNotUsed(resetPasswordDTO.getToken())
                .orElseThrow(() -> new AuthException("Invalid password reset token"));

        if (tokenEntry.getExpiryDate().isBefore(LocalDateTime.now())) {
            throw new AuthException("Password reset token has expired");
        }

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        HttpEntity<LoginDTO> entity = new HttpEntity<>(new LoginDTO(tokenEntry.getEmail(), resetPasswordDTO.getNewPassword()), headers);

        String updateURL = userServiceUrl + "password"; // Endpoint on user-service

        ResponseEntity<UserDTO> response = restTemplate.exchange(updateURL, HttpMethod.PUT, entity, UserDTO.class);

        if(response.getStatusCode().is2xxSuccessful()){
            passwordResetTokenRepository.deleteByToken(tokenEntry.getToken());
        }

        return "Password has been reset successfully";
    }
}

