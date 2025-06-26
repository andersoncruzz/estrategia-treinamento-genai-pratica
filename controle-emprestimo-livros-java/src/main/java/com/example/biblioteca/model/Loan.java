package com.exemplo.biblioteca.model;

import lombok.Data;
import java.time.LocalDate;

@Data
public class Loan {
    private String id;
    private String bookId;
    private String userId;
    private LocalDate loanDate;
    private LocalDate dueDate;
    private LocalDate returnDate;

    public Loan(String bookId, String userId, LocalDate loanDate, LocalDate dueDate) {
        this.id = java.util.UUID.randomUUID().toString();
        this.bookId = bookId;
        this.userId = userId;
        this.loanDate = loanDate;
        this.dueDate = dueDate;
    }
}