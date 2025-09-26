package com.example.Library.service;

import com.example.Library.dto.LoginRequest;
import com.example.Library.dto.LoginResponse;
import com.example.Library.dto.RegisterRequest;
import com.example.Library.model.Student;
import com.example.Library.repository.StudentRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class StudentAuthService {
    private final StudentRepository studentRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public StudentAuthService(StudentRepository studentRepository, PasswordEncoder passwordEncoder, JwtService jwtService) {
        this.studentRepository = studentRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
    }

    public LoginResponse login(LoginRequest loginRequest) {
        Student student = studentRepository.findByUsername(loginRequest.getUsername());
        if (student == null || !passwordEncoder.matches(loginRequest.getPassword(), student.getPassword())) {
            throw new RuntimeException("Invalid username or password");
        }
        String token = jwtService.generateToken(student.getId(), student.getUsername());
        return new LoginResponse(token, student.getId(), student.getUsername(), student.getFullName());
    }

    public Student register(RegisterRequest registerRequest) {
        if (studentRepository.findByUsername(registerRequest.getUsername()) != null) {
            throw new RuntimeException("Username already exists");
        }
        Student student = new Student();
        student.setUsername(registerRequest.getUsername());
        student.setPassword(passwordEncoder.encode(registerRequest.getPassword()));
        student.setFullName(registerRequest.getFullName());
        return studentRepository.save(student);
    }
}
