package com.dal.authservice.dto;

public class ResetPasswordDTO {
    private String token;
    private String newPassword;

    // Getters and setters
    public String getToken() {
        return token;
    }
    public void setToken(String token) {
        this.token = token;
    }
    public String getNewPassword() {
        return newPassword;
    }
    public void setNewPassword(String newPassword) {
        this.newPassword = newPassword;
    }
}
