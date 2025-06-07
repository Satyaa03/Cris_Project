package org.cris.railways.module.controller;

import org.cris.railways.module.model.User;
import org.cris.railways.module.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    // Endpoint to register user
    @PostMapping("/register")
    public ResponseEntity<String> registerUser(@RequestBody User user) {
        boolean isRegistered = userService.registerUser(user);
        if (isRegistered) {
            return ResponseEntity.status(HttpStatus.CREATED).body("User registered successfully");
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("User registration failed");
        }
    }

    // Endpoint to validate user login
    @PostMapping("/login")
    public ResponseEntity<String> loginUser(@RequestBody User user) {
        boolean isValid = userService.authenticateUser(user.getUsername(), user.getPassword());
        if (isValid) {
            return ResponseEntity.ok("Login successful");
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
        }
    }
}
