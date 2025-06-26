package com.example.contactagenda;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import org.springframework.boot.autoconfigure.domain.EntityScan;

@SpringBootApplication
@EntityScan("com.example.contactagenda.model")
public class ContactAgendaApplication {

    public static void main(String[] args) {
        SpringApplication.run(ContactAgendaApplication.class, args);
    }
}