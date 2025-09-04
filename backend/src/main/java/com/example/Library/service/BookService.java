package com.example.Library.service;

import com.example.Library.model.Book;
import com.example.Library.repository.BookRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BookService {
    private final BookRepository repo;

    public BookService(BookRepository repo) {
        this.repo = repo;
    }

    public List<Book> getAll() { return repo.findAll(); }

    public Optional<Book> getById(String id) { return repo.findById(id); }

    public Book create(Book book) { return repo.save(book); }

    public Book update(String id, Book updated) {
        return repo.findById(id).map(b -> {
            b.setTitle(updated.getTitle());
            b.setAuthor(updated.getAuthor());
            b.setIsbn(updated.getIsbn());
            b.setAvailable(updated.isAvailable());
            return repo.save(b);
        }).orElseThrow(() -> new RuntimeException("Book not found: " + id));
    }

    public void delete(String id) { repo.deleteById(id); }
}
