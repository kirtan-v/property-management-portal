package com.dal.leaseservice.config;

import com.dal.leaseservice.dto.UserDTO;
import com.dal.leaseservice.util.JwtTokenUtil;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.SignatureException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.List;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtTokenUtil jwtTokenUtil;

    @Value("${user.service.url}")
    private String userServiceUrl;

    @Autowired
    private RestTemplate restTemplate;

    public JwtAuthenticationFilter(JwtTokenUtil jwtTokenUtil) {
        this.jwtTokenUtil = jwtTokenUtil;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {

        String authorizationHeader = request.getHeader("Authorization");
        String token = null;
        String subject = null;

        if (authorizationHeader != null && !authorizationHeader.isEmpty()) {
            if (authorizationHeader.startsWith("Bearer ")) {
                token = authorizationHeader.substring(7);
                try {
                    subject = jwtTokenUtil.getEmailFromToken(token);
                } catch (SignatureException | ExpiredJwtException e) {
                    throw e;
                }
            }
        }

        if (subject != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            String url = userServiceUrl + "internal/" + subject;
            ResponseEntity<UserDTO> response1 = restTemplate.getForEntity(url, UserDTO.class);

            UserDTO user = response1.getBody();
            if (jwtTokenUtil.validateToken(token, user.getEmail())) {
                GrantedAuthority authority = new SimpleGrantedAuthority(user.getRole());
                UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                        user, token, List.of(authority));
                authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                SecurityContextHolder.getContext().setAuthentication(authToken);
            }else {
                throw new SignatureException("Invalid token.");
            }
        }

        filterChain.doFilter(request, response);

    }
}
