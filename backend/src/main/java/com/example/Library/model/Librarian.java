package com.example.Library.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;

@Data
@Document(collection = "librarians")
public class Librarian {
    @Id
    private String id;
    private String username;
    private String password; // Will be encrypted
    private String email;
    private String fullName;
}