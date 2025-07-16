package com.dal.authservice.dto;

public class LoginDTO {
    private String email;
    private String password;

    public LoginDTO(String email, String newPassword) {
        this.email = email;
        this.password = newPassword;
    }

    // Getters and setters
    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }
    public String getPassword() {
        return password;
    }
    public void setPassword(String password) {
        this.password = password;
    }
}
