package com.example.Library.controller;

import com.example.Library.model.User;
import com.example.Library.service.UserService;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "*")
@PreAuthorize("hasRole('LIBRARIAN')")
public class UserController {
    private final UserService service;

    public UserController(UserService service) { 
        this.service = service; 
    }

    @GetMapping
    public List<User> all() { 
        return service.getAll(); 
    }

    @PostMapping
    public User create(@RequestBody User u) { 
        return service.create(u); 
    }

    @PostMapping("/{userId}/borrow")
    public User borrow(@PathVariable String userId, @RequestBody Map<String, String> body) {
        return service.borrowBook(userId, body.get("bookId"));
    }

    @PostMapping("/{userId}/return")
    public User returnBook(@PathVariable String userId, @RequestBody Map<String, String> body) {
        return service.returnBook(userId, body.get("bookId"));
    }
}