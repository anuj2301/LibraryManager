package com.example.Library.security;

import com.example.Library.model.Librarian;
import com.example.Library.repository.LibrarianRepository;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collections;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    private final LibrarianRepository librarianRepository;

    public CustomUserDetailsService(LibrarianRepository librarianRepository) {
        this.librarianRepository = librarianRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Librarian librarian = librarianRepository.findByUsername(username)
            .orElseThrow(() -> new UsernameNotFoundException("User not found: " + username));

        return User.builder()
            .username(librarian.getUsername())
            .password(librarian.getPassword())
            .authorities(Collections.singletonList(new SimpleGrantedAuthority("ROLE_LIBRARIAN")))
            .build();
    }
}