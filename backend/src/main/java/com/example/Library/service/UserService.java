package com.example.Library.service;

import com.example.Library.model.Book;
import com.example.Library.model.User;
import com.example.Library.repository.BookRepository;
import com.example.Library.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {
    private final UserRepository userRepo;
    private final BookRepository bookRepo;

    public UserService(UserRepository userRepo, BookRepository bookRepo) {
        this.userRepo = userRepo;
        this.bookRepo = bookRepo;
    }

    public List<User> getAll() { return userRepo.findAll(); }

    public User create(User u) { return userRepo.save(u); }

    public User borrowBook(String userId, String bookId) {
        User u = userRepo.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        Book b = bookRepo.findById(bookId).orElseThrow(() -> new RuntimeException("Book not found"));
        if (!b.isAvailable()) throw new RuntimeException("Book already borrowed");
        b.setAvailable(false);
        bookRepo.save(b);
        u.getBorrowedBooks().add(bookId);
        return userRepo.save(u);
    }

    public User returnBook(String userId, String bookId) {
        User u = userRepo.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        Book b = bookRepo.findById(bookId).orElseThrow(() -> new RuntimeException("Book not found"));
        b.setAvailable(true);
        bookRepo.save(b);
        u.getBorrowedBooks().remove(bookId);
        return userRepo.save(u);
    }
}
