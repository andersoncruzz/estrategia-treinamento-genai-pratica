package com.exemplo.biblioteca.model;

import lombok.Data;
import java.util.UUID;

@Data
public class Book {
    private String id;
    private String title;
    private String author;
    private boolean available = true;

    public Book(String title, String author) {
        this.id = UUID.randomUUID().toString();
        this.title = title;
        this.author = author;
        this.available = true;
    }
}