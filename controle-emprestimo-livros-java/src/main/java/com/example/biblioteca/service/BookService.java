package com.exemplo.biblioteca.service;

import com.exemplo.biblioteca.model.Book;
import org.springframework.stereotype.Service;
import java.util.*;

@Service
public class BookService {
    private final List<Book> books = new ArrayList<>();

    public Book addBook(String title, String author) {
        Book book = new Book(title, author);
        books.add(book);
        return book;
    }

    public Optional<Book> getBook(String id) {
        return books.stream().filter(b -> b.getId().equals(id)).findFirst();
    }

    public List<Book> getAllBooks() {
        return books;
    }

    public void setAvailability(String id, boolean available) {
        getBook(id).ifPresent(book -> book.setAvailable(available));
    }
}