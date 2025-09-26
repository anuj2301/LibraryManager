package com.example.Library.service;

import com.example.Library.dto.LoginRequest;
import com.example.Library.dto.LoginResponse;
import com.example.Library.dto.RegisterRequest;
import com.example.Library.model.Faculty;
import com.example.Library.repository.FacultyRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class FacultyAuthService {
    private final FacultyRepository facultyRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public FacultyAuthService(FacultyRepository facultyRepository, PasswordEncoder passwordEncoder,
            JwtService jwtService) {
        this.facultyRepository = facultyRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
    }

    public LoginResponse login(LoginRequest loginRequest) {
        Faculty faculty = facultyRepository.findByUsername(loginRequest.getUsername());
        if (faculty == null || !passwordEncoder.matches(loginRequest.getPassword(), faculty.getPassword())) {
            throw new RuntimeException("Invalid username or password");
        }
        String token = jwtService.generateToken(faculty.getId(), faculty.getUsername());
        return new LoginResponse(token, faculty.getId(), faculty.getUsername(), faculty.getFullName());
    }

    public Faculty register(RegisterRequest registerRequest) {
        if (facultyRepository.existsByUsername(registerRequest.getUsername())) {
            throw new RuntimeException("Username already exists");
        }
        Faculty faculty = new Faculty();
        faculty.setUsername(registerRequest.getUsername());
        faculty.setPassword(passwordEncoder.encode(registerRequest.getPassword()));
        faculty.setFullName(registerRequest.getFullName());
        return facultyRepository.save(faculty);
    }
}
