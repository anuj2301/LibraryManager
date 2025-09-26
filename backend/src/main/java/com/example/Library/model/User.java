package com.example.Library.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.List;

@Data
@Document(collection = "users")
public class User {
    @Id
    private String id;
    private String name;
    private String email;
    private List<String> borrowedBooks = new ArrayList<>();
    private String librarianId; // Added for multi-tenant support
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public List<String> getBorrowedBooks() {
		return borrowedBooks;
	}
	public void setBorrowedBooks(List<String> borrowedBooks) {
		this.borrowedBooks = borrowedBooks;
	}
	public String getLibrarianId() {
		return librarianId;
	}
	public void setLibrarianId(String librarianId) {
		this.librarianId = librarianId;
	}
}