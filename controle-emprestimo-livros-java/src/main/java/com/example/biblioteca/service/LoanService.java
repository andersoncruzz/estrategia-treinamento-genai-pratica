package com.exemplo.biblioteca.service;

import com.exemplo.biblioteca.model.Loan;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.util.*;

@Service
public class LoanService {
    private final List<Loan> loans = new ArrayList<>();

    public Loan addLoan(String bookId, String userId, LocalDate loanDate, LocalDate dueDate) {
        Loan loan = new Loan(bookId, userId, loanDate, dueDate);
        loans.add(loan);
        return loan;
    }

    public List<Loan> getAllLoans() {
        return loans;
    }

    public List<Loan> getOverdueLoans(LocalDate today) {
        List<Loan> overdue = new ArrayList<>();
        for (Loan loan : loans) {
            if (loan.getReturnDate() == null && loan.getDueDate().isBefore(today)) {
                overdue.add(loan);
            }
        }
        return overdue;
    }

    public Optional<Loan> getLoan(String id) {
        return loans.stream().filter(l -> l.getId().equals(id)).findFirst();
    }

    public void returnBook(String loanId, LocalDate returnDate) {
        getLoan(loanId).ifPresent(loan -> loan.setReturnDate(returnDate));
    }
}