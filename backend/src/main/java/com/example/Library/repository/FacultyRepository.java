package com.example.Library.repository;

import com.example.Library.model.Faculty;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FacultyRepository extends MongoRepository<Faculty, String> {
    Faculty findByUsername(String username);

    boolean existsByUsername(String username);
}
