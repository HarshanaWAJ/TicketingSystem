package com.example.backend.Services;
import com.example.backend.Entities.EventEntity;
import com.example.backend.Entities.User;
import com.example.backend.Exceptions.UserNotFoundException;
import com.example.backend.Repositories.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepo userRepo;

    public User registerUser(User user) {
        try {
            return userRepo.save(user);
        } catch (Exception e) {
            return null;
        }
    }

    public List<User> getAllUsers() {
        try {
            List<User> userList = userRepo.findAll();
            return userList;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    public User updateUser(int id, User user) {
        if (userRepo.existsById(id)) {
            // Retrieve the existing user
            User existingUser = userRepo.findById(id).orElseThrow(() -> new RuntimeException("User not found"));

            // Update the existing user's fields
            existingUser.setUserEmail(user.getUserEmail());
            existingUser.setUserPassword(user.getUserPassword());

            // Save the updated user back to the repository
            return userRepo.save(existingUser);
        } else {
            throw new RuntimeException("User not found");
        }
    }

    public void deleteUser(int id) {
        if (userRepo.existsById(id)) {
            userRepo.deleteById(id);
        } else {
            throw new UserNotFoundException("User not found with id " + id);
        }
    }

    // Login method
    public User loginUser(String userEmail, String userPassword) {
        Optional<User> optionalUser = userRepo.findByUserEmail(userEmail);

        if (optionalUser.isPresent()) {
            User existingUser = optionalUser.get();
            if (existingUser.getUserPassword().equals(userPassword)) {
                return existingUser;  // Valid credentials
            } else {
                return null;  // Invalid password
            }
        } else {
            return null;  // User not found
        }
    }
}
