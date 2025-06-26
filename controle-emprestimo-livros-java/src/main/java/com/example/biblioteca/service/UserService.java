package com.exemplo.biblioteca.service;

import com.exemplo.biblioteca.model.User;
import org.springframework.stereotype.Service;
import java.util.*;

@Service
public class UserService {
    private final List<User> users = new ArrayList<>();

    public User addUser(String name, String email) {
        User user = new User(name, email);
        users.add(user);
        return user;
    }

    public Optional<User> getUser(String id) {
        return users.stream().filter(u -> u.getId().equals(id)).findFirst();
    }

    public List<User> getAllUsers() {
        return users;
    }
}