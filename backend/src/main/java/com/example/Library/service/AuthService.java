package com.example.Library.service;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.Library.dto.LoginRequest;
import com.example.Library.dto.LoginResponse;
import com.example.Library.dto.RegisterRequest;
import com.example.Library.model.Librarian;
import com.example.Library.repository.LibrarianRepository;

@Service
public class AuthService {
    
    private final LibrarianRepository librarianRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    
    public AuthService(LibrarianRepository librarianRepository, 
                      PasswordEncoder passwordEncoder,
                      JwtService jwtService,
                      AuthenticationManager authenticationManager) {
        this.librarianRepository = librarianRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
        this.authenticationManager = authenticationManager;
    }
    
    public LoginResponse login(LoginRequest loginRequest) {
        Authentication authentication = authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(
                loginRequest.getUsername(),
                loginRequest.getPassword()
            )
        );
        
        Librarian librarian = librarianRepository.findByUsername(loginRequest.getUsername())
            .orElseThrow(() -> new RuntimeException("Librarian not found"));
            
        String token = jwtService.generateToken(librarian.getId(), librarian.getUsername());
        
        return new LoginResponse(token, librarian.getId(), 
                               librarian.getUsername(), librarian.getFullName());
    }
    
    // public Librarian register(RegisterRequest registerRequest) {
    //     if (librarianRepository.existsByUsername(registerRequest.getUsername())) {
    //         throw new RuntimeException("Username already exists");
    //     }
        
    //     if (librarianRepository.existsByEmail(registerRequest.getEmail())) {
    //         throw new RuntimeException("Email already exists");
    //     }
        
    //     Librarian librarian = new Librarian();
    //     librarian.setUsername(registerRequest.getUsername());
    //     librarian.setPassword(passwordEncoder.encode(registerRequest.getPassword()));
    //     librarian.setEmail(registerRequest.getEmail());
    //     librarian.setFullName(registerRequest.getFullName());
        
    //     return librarianRepository.save(librarian);
    // }
    public Librarian register(RegisterRequest registerRequest) {
    if (librarianRepository.existsByUsername(registerRequest.getUsername())) {
        throw new RuntimeException("Username already exists");
    }
    
    // Remove this email check:
    // if (librarianRepository.existsByEmail(registerRequest.getEmail())) {
    //     throw new RuntimeException("Email already exists");
    // }
    
    Librarian librarian = new Librarian();
    librarian.setUsername(registerRequest.getUsername());
    librarian.setPassword(passwordEncoder.encode(registerRequest.getPassword()));
    // Remove this line: librarian.setEmail(registerRequest.getEmail());
    librarian.setFullName(registerRequest.getFullName());
    
    return librarianRepository.save(librarian);
}
}