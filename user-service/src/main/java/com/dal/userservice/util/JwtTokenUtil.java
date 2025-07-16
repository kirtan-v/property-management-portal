package com.dal.userservice.util;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtBuilder;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import java.util.Date;

@Component
public class JwtTokenUtil {

    @Value("${jwt.secret}")
    private String secret; // Injected from application.properties

    @Value("${jwt.expiration}")
    private long expiration; // Injected from application.properties (in milliseconds)

    // Generate a JWT token using email as the subject
    public String generateToken(String email, String role) {
        Date now = new Date();
        Date expiryDate = new Date(System.currentTimeMillis() + expiration);

        JwtBuilder builder = Jwts.builder()
                .setSubject(email)
                .claim("role", role)
                .setIssuedAt(now)
                .setExpiration(expiryDate)
                .signWith(SignatureAlgorithm.HS256, secret.getBytes());

        return builder.compact();
    }

    // Extract email from the JWT token
    public String getEmailFromToken(String token) {
        return extractAllClaims(token).getSubject();
    }

    public Claims extractAllClaims(String token) {
        return Jwts.parser().setSigningKey(secret.getBytes()).parseClaimsJws(token).getBody();
    }

    public String extractRole(String token) {
        return (String) extractAllClaims(token).get("role");
    }

    public boolean isTokenExpired(String token) {
        return extractAllClaims(token).getExpiration().before(new Date());
    }

    public boolean validateToken(String token, String email) {
        return (getEmailFromToken(token).equals(email) && !isTokenExpired(token));
    }
}
