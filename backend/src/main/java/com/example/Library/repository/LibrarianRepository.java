package com.example.Library.repository;

import com.example.Library.model.Librarian;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface LibrarianRepository extends MongoRepository<Librarian, String> {
    Optional<Librarian> findByUsername(String username);
    Optional<Librarian> findByEmail(String email);
    boolean existsByUsername(String username);
    boolean existsByEmail(String email);
}