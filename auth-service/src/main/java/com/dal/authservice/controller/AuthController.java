package com.dal.authservice.controller;

import com.dal.authservice.dto.*;
import com.dal.authservice.service.AuthService;
import com.dal.authservice.util.JwtTokenUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    @GetMapping("/health")
    public ResponseEntity<String> check() {
            return ResponseEntity.ok("Health is good.");
    }

    // POST /auth/login - Authenticate and return JWT token
    @PostMapping("/login")
    public ResponseEntity<AuthResponseDTO> login(@RequestBody LoginDTO loginDTO) {
        AuthResponseDTO response = authService.login(loginDTO);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/forgot-password")
    public ResponseEntity<String> forgotPassword(@RequestBody ForgotPasswordDTO forgotPasswordDTO) {
        String message = authService.forgotPassword(forgotPasswordDTO);
        return ResponseEntity.ok(message);
    }

    @PostMapping("/reset-password")
    public ResponseEntity<String> resetPassword(@RequestBody ResetPasswordDTO resetPasswordDTO) {
        String message = authService.resetPassword(resetPasswordDTO);
        return ResponseEntity.ok(message);
    }

    // GET /auth/validate - Validate the token (can be used internally)
//    @GetMapping("/validate")
//    public ResponseEntity<String> validateToken(@RequestHeader("Authorization") String authHeader) {
//        String token = authHeader.startsWith("Bearer ") ? authHeader.substring(7) : authHeader;
//        if (jwtTokenUtil.validateToken(token)) {
//            return ResponseEntity.ok("Token is valid");
//        } else {
//            return ResponseEntity.status(401).body("Invalid or expired token");
//        }
//    }

    // GET /auth/profile - Retrieve the logged-in user's profile (using email from token)
//    @GetMapping("/profile")
//    public ResponseEntity<UserDTO> getProfile(@RequestHeader("Authorization") String authHeader) {
//        String token = authHeader.startsWith("Bearer ") ? authHeader.substring(7) : authHeader;
//        String email = jwtTokenUtil.getEmailFromToken(token);
//        UserDTO user = userService.getUserByEmail(email);
//        return ResponseEntity.ok(user);
//    }
}
