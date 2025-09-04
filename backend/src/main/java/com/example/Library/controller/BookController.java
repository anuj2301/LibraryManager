package com.example.Library.controller;

import com.example.Library.model.Book;
import com.example.Library.service.BookService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/books")
@CrossOrigin(origins = "*")
public class BookController {
    private final BookService service;

    public BookController(BookService service) { this.service = service; }

    @GetMapping
    public List<Book> all() { return service.getAll(); }

    @PostMapping
    public Book create(@RequestBody Book b) { return service.create(b); }

    @PutMapping("/{id}")
    public Book update(@PathVariable String id, @RequestBody Book b) { return service.update(id, b); }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable String id) { service.delete(id); }
}
