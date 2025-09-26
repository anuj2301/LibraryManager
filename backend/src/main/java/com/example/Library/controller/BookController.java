package com.example.Library.controller;

import com.example.Library.model.Book;
import com.example.Library.service.BookService;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/books")
@CrossOrigin(origins = "*")
public class BookController {
    private final BookService service;


    // Endpoint for students to get all available books
    @GetMapping("/available")
    @PreAuthorize("hasRole('STUDENT') or hasRole('LIBRARIAN')")
    public List<Book> getAvailableBooks() {
        return service.getAllAvailable();
    }
    public BookController(BookService service) { 
        this.service = service; 
    }


    @GetMapping
    @PreAuthorize("isAuthenticated()")
    public List<Book> all() {
        return service.getAll();
    }


    @PostMapping
    @PreAuthorize("hasRole('LIBRARIAN')")
    public Book create(@RequestBody Book b) {
        return service.create(b);
    }


    @PutMapping("/{id}")
    @PreAuthorize("hasRole('LIBRARIAN')")
    public Book update(@PathVariable String id, @RequestBody Book b) {
        return service.update(id, b);
    }


    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('LIBRARIAN')")
    public void delete(@PathVariable String id) {
        service.delete(id);
    }
}