package com.example.Library.repository;

import com.example.Library.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends MongoRepository<User, String> {
    List<User> findByLibrarianId(String librarianId);
    Optional<User> findByIdAndLibrarianId(String id, String librarianId);
    Optional<User> findByEmailAndLibrarianId(String email, String librarianId);
    void deleteByIdAndLibrarianId(String id, String librarianId);
}