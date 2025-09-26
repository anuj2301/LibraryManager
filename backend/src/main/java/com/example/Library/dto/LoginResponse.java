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

	public String getToken() {
		return token;
	}

	public void setToken(String token) {
		this.token = token;
	}

	public String getLibrarianId() {
		return librarianId;
	}

	public void setLibrarianId(String librarianId) {
		this.librarianId = librarianId;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getFullName() {
		return fullName;
	}

	public void setFullName(String fullName) {
		this.fullName = fullName;
	}
}