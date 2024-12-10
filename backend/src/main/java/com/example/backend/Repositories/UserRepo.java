package com.example.backend.Repositories;

import com.example.backend.Entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepo extends JpaRepository<User, Integer> {
    // Find a user by email
    Optional<User> findByUserEmail(String userEmail);
}
