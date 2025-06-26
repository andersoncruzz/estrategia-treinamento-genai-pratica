package com.exemplo.biblioteca.model;

import lombok.Data;
import java.util.UUID;

@Data
public class User {
    private String id;
    private String name;
    private String email;

    public User(String name, String email) {
        this.id = UUID.randomUUID().toString();
        this.name = name;
        this.email = email;
    }
}