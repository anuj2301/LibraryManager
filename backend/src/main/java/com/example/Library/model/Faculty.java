package com.example.Library.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import lombok.Data;

@Data
@Document(collection = "faculty")
public class Faculty {
    @Id
    private String id;
    private String username;
    private String password;
    private String email;
    private String fullName;
    private String department;
}
