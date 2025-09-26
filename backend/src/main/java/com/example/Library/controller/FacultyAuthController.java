package com.example.Library.controller;

import com.example.Library.dto.LoginRequest;
import com.example.Library.dto.LoginResponse;
import com.example.Library.dto.RegisterRequest;
import com.example.Library.model.Faculty;
import com.example.Library.service.FacultyAuthService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/faculty-auth")
@CrossOrigin(origins = "*")
public class FacultyAuthController {
    private final FacultyAuthService facultyAuthService;

    public FacultyAuthController(FacultyAuthService facultyAuthService) {
        this.facultyAuthService = facultyAuthService;
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest loginRequest) {
        LoginResponse response = facultyAuthService.login(loginRequest);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/register")
    public ResponseEntity<Faculty> register(@RequestBody RegisterRequest registerRequest) {
        Faculty faculty = facultyAuthService.register(registerRequest);
        return ResponseEntity.ok(faculty);
    }
}
