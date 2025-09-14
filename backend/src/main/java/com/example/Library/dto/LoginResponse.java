package com.example.Library.dto;

import lombok.Data;

@Data
public class LoginResponse {
    private String token;
    private String librarianId;
    private String username;
    private String fullName;
    
    public LoginResponse(String token, String librarianId, String username, String fullName) {
        this.token = token;
        this.librarianId = librarianId;
        this.username = username;
        this.fullName = fullName;
    }
}