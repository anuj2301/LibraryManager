package com.example.Library.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.example.Library.model.Book;

public interface BookRepository extends MongoRepository<Book, String> {
    List<Book> findByLibrarianId(String librarianId);
    Optional<Book> findByIdAndLibrarianId(String id, String librarianId);
    List<Book> findByLibrarianIdAndAvailable(String librarianId, boolean available);
    Optional<Book> findByIsbnAndLibrarianId(String isbn, String librarianId);
    void deleteByIdAndLibrarianId(String id, String librarianId);

    // New method to fetch all available books (for students)
    List<Book> findByAvailable(boolean available);
}