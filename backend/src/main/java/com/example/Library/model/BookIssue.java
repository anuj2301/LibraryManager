package com.example.Library.model;

import java.time.LocalDateTime;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;

@Data
@Document(collection = "book_issues")
public class BookIssue {
    @Id
    private String id;
    private String bookId;
    private String userId;
    private LocalDateTime issueDate;
    private LocalDateTime dueDate;
    private LocalDateTime returnDate;
    private boolean returned = false;
    private String librarianId; // Added for multi-tenant support
}