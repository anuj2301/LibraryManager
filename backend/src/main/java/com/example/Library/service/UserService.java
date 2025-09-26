package com.example.Library.service;

import com.example.Library.model.Book;
import com.example.Library.model.User;
import com.example.Library.repository.BookRepository;
import com.example.Library.repository.UserRepository;
import com.example.Library.model.BookIssue;
import com.example.Library.model.Student;
import com.example.Library.repository.BookIssueRepository;
import com.example.Library.repository.StudentRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.time.LocalDateTime;

@Service
public class UserService {
    private final UserRepository userRepo;
    private final BookRepository bookRepo;
    private final BookIssueRepository bookIssueRepo;
    private final StudentRepository studentRepo;

    public UserService(UserRepository userRepo, BookRepository bookRepo, BookIssueRepository bookIssueRepo,
            StudentRepository studentRepo) {
        this.userRepo = userRepo;
        this.bookRepo = bookRepo;
        this.bookIssueRepo = bookIssueRepo;
        this.studentRepo = studentRepo;
    }

    public List<User> getAll() {
        String librarianId = TenantContext.getTenantId();
        return userRepo.findByLibrarianId(librarianId);
    }

    public User create(User u) {
        String librarianId = TenantContext.getTenantId();
        u.setLibrarianId(librarianId);
        return userRepo.save(u);
    }

    public User borrowBook(String userId, String bookId) {
        String librarianId = TenantContext.getTenantId();
        User u = userRepo.findByIdAndLibrarianId(userId, librarianId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        Book b = bookRepo.findByIdAndLibrarianId(bookId, librarianId)
                .orElseThrow(() -> new RuntimeException("Book not found"));

        // Prevent issuing read-only books
        if (b.isReadOnly()) {
            throw new RuntimeException("This book is read-only and cannot be issued");
        }

        // Enforce book issue limit for students
        Student student = studentRepo.findById(userId).orElse(null);
        if (student != null) {
            int currentIssued = bookIssueRepo.findByUserIdAndLibrarianId(userId, librarianId)
                    .stream().filter(issue -> !issue.isReturned()).toList().size();
            if (currentIssued >= student.getIssueLimit()) {
                throw new RuntimeException("Book issue limit reached");
            }
        }

        // Prevent duplicate issue for same book and overlapping dates
        List<BookIssue> activeIssues = bookIssueRepo.findByBookIdAndLibrarianId(bookId, librarianId)
                .stream().filter(issue -> !issue.isReturned()).toList();
        if (!activeIssues.isEmpty()) {
            throw new RuntimeException("Book already issued for the selected dates");
        }

        if (!b.isAvailable()) {
            throw new RuntimeException("Book already borrowed");
        }

        b.setAvailable(false);
        bookRepo.save(b);
        u.getBorrowedBooks().add(bookId);
        // Create BookIssue record
        BookIssue issue = new BookIssue();
        issue.setBookId(bookId);
        issue.setUserId(userId);
        issue.setIssueDate(LocalDateTime.now());
        issue.setDueDate(LocalDateTime.now().plusDays(14)); // Default 2 weeks
        issue.setReturned(false);
        issue.setLibrarianId(librarianId);
        bookIssueRepo.save(issue);
        return userRepo.save(u);
    }

    public User returnBook(String userId, String bookId) {
        String librarianId = TenantContext.getTenantId();
        User u = userRepo.findByIdAndLibrarianId(userId, librarianId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        Book b = bookRepo.findByIdAndLibrarianId(bookId, librarianId)
                .orElseThrow(() -> new RuntimeException("Book not found"));

        // Find active BookIssue
        List<BookIssue> issues = bookIssueRepo.findByBookIdAndLibrarianId(bookId, librarianId)
                .stream().filter(issue -> !issue.isReturned() && issue.getUserId().equals(userId)).toList();
        for (BookIssue issue : issues) {
            issue.setReturned(true);
            issue.setReturnDate(LocalDateTime.now());
            // Fine calculation
            if (issue.getDueDate() != null && issue.getReturnDate().isAfter(issue.getDueDate())) {
                long overdueDays = java.time.Duration.between(issue.getDueDate(), issue.getReturnDate()).toDays();
                Student student = studentRepo.findById(userId).orElse(null);
                if (student != null) {
                    double fineAmount = overdueDays * 10.0; // Rs. 10 per day
                    student.setFine(student.getFine() + fineAmount);
                    studentRepo.save(student);
                }
            }
            bookIssueRepo.save(issue);
        }

        b.setAvailable(true);
        bookRepo.save(b);
        u.getBorrowedBooks().remove(bookId);
        return userRepo.save(u);
    }
}