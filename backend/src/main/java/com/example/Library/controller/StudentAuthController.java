package com.example.Library.controller;

import com.example.Library.dto.LoginRequest;
import com.example.Library.dto.LoginResponse;
import com.example.Library.dto.RegisterRequest;
import com.example.Library.model.Student;
import com.example.Library.service.StudentAuthService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/student-auth")
@CrossOrigin(origins = "*")
public class StudentAuthController {
    private final StudentAuthService studentAuthService;

    public StudentAuthController(StudentAuthService studentAuthService) {
        this.studentAuthService = studentAuthService;
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest loginRequest) {
        LoginResponse response = studentAuthService.login(loginRequest);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/register")
    public ResponseEntity<Student> register(@RequestBody RegisterRequest registerRequest) {
        Student student = studentAuthService.register(registerRequest);
        return ResponseEntity.ok(student);
    }
}
