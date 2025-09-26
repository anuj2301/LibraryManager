package com.example.Library.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import lombok.Data;

@Data
@Document(collection = "students")
public class Student {
    @Id
    private String id;
    private String username;
    private String password;
    private String email;
    private String fullName;
    private int issueLimit = 3; // Default max books a student can issue
    private double fine = 0.0; // Fine amount for overdue books
}
