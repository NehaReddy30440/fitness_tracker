package com.example.fitness.controller;

import com.example.fitness.model.User;
import com.example.fitness.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:5174"})
@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/register")
    public ResponseEntity<String> registerUser(@RequestBody User user) {
        String email = user.getEmail();
        String password = user.getPassword();

        if (userRepository.findByEmail(email) != null) {
            return ResponseEntity.badRequest().body("Email already registered!");
        }

        userRepository.save(user);
        return ResponseEntity.ok("Registration successful!");
    }

    @PostMapping("/login")
    public ResponseEntity<String> loginUser(@RequestBody User loginRequest) {
        String email = loginRequest.getEmail();
        String password = loginRequest.getPassword();

        User user = userRepository.findByEmail(email);

        if (user != null && user.getPassword().equals(password)) {
            return ResponseEntity.ok("Login successful!");
        }

        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials!");
    }

    @GetMapping("/profile/{email}")
    public ResponseEntity<User> getUserProfile(@PathVariable String email) {
        System.out.println("Profile request for email: " + email);
        User user = userRepository.findByEmail(email);
        System.out.println("User found: " + (user != null ? user.getEmail() : "null"));
        if (user != null) {
            // Remove sensitive information and relationships
            user.setPassword(null);
            user.setWorkoutLogs(null);
            user.setGoals(null);
            return ResponseEntity.ok(user);
        }
        return ResponseEntity.notFound().build();
    }

    @PutMapping("/profile/{email}")
    public ResponseEntity<String> updateUserProfile(@PathVariable String email, @RequestBody User profileUpdate) {
        User user = userRepository.findByEmail(email);
        if (user == null) {
            return ResponseEntity.notFound().build();
        }

        // Update only profile fields, not sensitive data
        if (profileUpdate.getName() != null) {
            user.setName(profileUpdate.getName());
        }
        if (profileUpdate.getAge() != null && profileUpdate.getAge() > 0) {
            user.setAge(profileUpdate.getAge());
        }
        if (profileUpdate.getGender() != null) {
            user.setGender(profileUpdate.getGender());
        }
        if (profileUpdate.getWeight() != null && profileUpdate.getWeight() > 0) {
            user.setWeight(profileUpdate.getWeight());
        }
        if (profileUpdate.getHeight() != null && profileUpdate.getHeight() > 0) {
            user.setHeight(profileUpdate.getHeight());
        }

        userRepository.save(user);
        return ResponseEntity.ok("Profile updated successfully!");
    }
}