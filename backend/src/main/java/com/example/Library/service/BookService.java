package com.example.Library.service;

import com.example.Library.model.Book;
import com.example.Library.repository.BookRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BookService {
    private final BookRepository repo;

    // New method for students to get all available books
    public List<Book> getAllAvailable() {
        return repo.findByAvailable(true);
    }
    public BookService(BookRepository repo) {
        this.repo = repo;
    }

    public List<Book> getAll() { 
        String librarianId = TenantContext.getTenantId();
        return repo.findByLibrarianId(librarianId); 
    }

    public Optional<Book> getById(String id) { 
        String librarianId = TenantContext.getTenantId();
        return repo.findByIdAndLibrarianId(id, librarianId); 
    }

    public Book create(Book book) { 
        String librarianId = TenantContext.getTenantId();
        book.setLibrarianId(librarianId);
        return repo.save(book); 
    }

    public Book update(String id, Book updated) {
        String librarianId = TenantContext.getTenantId();
        return repo.findByIdAndLibrarianId(id, librarianId).map(b -> {
            b.setTitle(updated.getTitle());
            b.setAuthor(updated.getAuthor());
            b.setIsbn(updated.getIsbn());
            b.setAvailable(updated.isAvailable());
            return repo.save(b);
        }).orElseThrow(() -> new RuntimeException("Book not found: " + id));
    }

    public void delete(String id) { 
        String librarianId = TenantContext.getTenantId();
        repo.deleteByIdAndLibrarianId(id, librarianId);
    }
}