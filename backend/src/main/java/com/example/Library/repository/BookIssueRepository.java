package com.example.Library.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.example.Library.model.BookIssue;

public interface BookIssueRepository extends MongoRepository<BookIssue, String> {
    List<BookIssue> findByLibrarianId(String librarianId);
    List<BookIssue> findByLibrarianIdAndReturned(String librarianId, boolean returned);
    List<BookIssue> findByUserIdAndLibrarianId(String userId, String librarianId);
    List<BookIssue> findByBookIdAndLibrarianId(String bookId, String librarianId);
    Optional<BookIssue> findByBookIdAndUserIdAndLibrarianIdAndReturned(
        String bookId, String userId, String librarianId, boolean returned);
}