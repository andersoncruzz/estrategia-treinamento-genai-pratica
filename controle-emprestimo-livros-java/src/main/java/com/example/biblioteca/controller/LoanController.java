package com.exemplo.biblioteca.controller;

import com.exemplo.biblioteca.model.Loan;
import com.exemplo.biblioteca.service.LoanService;
import com.exemplo.biblioteca.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/loans")
public class LoanController {
    @Autowired
    private LoanService loanService;
    @Autowired
    private BookService bookService;

    @PostMapping
    public Loan addLoan(@RequestBody Loan loan) {
        // Valida se o livro está disponível
        bookService.setAvailability(loan.getBookId(), false);
        return loanService.addLoan(
            loan.getBookId(),
            loan.getUserId(),
            loan.getLoanDate(),
            loan.getDueDate()
        );
    }

    @GetMapping
    public List<Loan> getAllLoans() {
        return loanService.getAllLoans();
    }

    @GetMapping("/overdue")
    public List<Loan> getOverdueLoans() {
        return loanService.getOverdueLoans(LocalDate.now());
    }

    @PostMapping("/{id}/return")
    public void returnBook(@PathVariable String id) {
        loanService.returnBook(id, LocalDate.now());
        // Aqui você pode adicionar lógica para marcar o livro como disponível novamente
    }
}