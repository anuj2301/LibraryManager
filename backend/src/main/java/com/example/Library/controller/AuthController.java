package com.example.Library.controller;

import com.example.Library.dto.LoginRequest;
import com.example.Library.dto.LoginResponse;
import com.example.Library.dto.RegisterRequest;
import com.example.Library.model.Librarian;
import com.example.Library.service.AuthService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {
    
    private final AuthService authService;
    
    public AuthController(AuthService authService) {
        this.authService = authService;
    }
    
    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest loginRequest) {
        LoginResponse response = authService.login(loginRequest);
        return ResponseEntity.ok(response);
    }
    
    @PostMapping("/register")
    public ResponseEntity<Librarian> register(@RequestBody RegisterRequest registerRequest) {
        Librarian librarian = authService.register(registerRequest);
        return ResponseEntity.ok(librarian);
    }
    
    @PostMapping("/logout")
    public ResponseEntity<String> logout() {
        return ResponseEntity.ok("Logged out successfully");
    }
}
