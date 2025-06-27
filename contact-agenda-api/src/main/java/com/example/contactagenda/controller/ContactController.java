package com.example.contactagenda.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import com.example.contactagenda.model.Contact;
import com.example.contactagenda.service.ContactService;


/**
 * REST controller for managing contacts in the agenda.
 * <p>
 * Provides endpoints to add, list, and search contacts by name.
 * </p>
 */
@RestController
@RequestMapping("/api/contacts")
public class ContactController {

    @Autowired
    private ContactService contactService;

    /**
     * Handles HTTP GET requests to search for contacts by their name.
     *
     * @param name the name or partial name of the contact(s) to search for, provided as a query parameter
     * @return a ResponseEntity containing a list of contacts matching the given name
     */
    @GetMapping("/search")
    public ResponseEntity<List<Contact>> searchContactsByName(@RequestParam String name) {
        List<Contact> contacts = contactService.searchContactsByName(name);
        return ResponseEntity.ok(contacts);
    }

    /**
     * Handles HTTP POST requests to add a new contact.
     *
     * @param contact the contact object to be added, provided in the request body
     * @return a ResponseEntity containing the saved contact
     */
    @PostMapping
    public ResponseEntity<Contact> addContact(@RequestBody Contact contact) {
        Contact savedContact = contactService.addContact(contact);
        return ResponseEntity.ok(savedContact);
    }

    /**
     * Handles HTTP GET requests to retrieve all contacts.
     *
     * @return a ResponseEntity containing a list of all contacts
     */
    @GetMapping
    public ResponseEntity<List<Contact>> getAllContacts() {
        List<Contact> contacts = contactService.getAllContacts();
        return ResponseEntity.ok(contacts);
    }

    /**
     * Handles HTTP DELETE requests to remove a contact by ID.
     *
     * @param id the ID of the contact to be removed
     * @return a ResponseEntity with no content if successful
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteContact(@PathVariable Long id) {
        contactService.deleteContact(id);
        return ResponseEntity.noContent().build();
    }

    /**
     * Handles HTTP PUT requests to update a contact by ID.
     *
     * @param id the ID of the contact to be updated
     * @param contact the updated contact data
     * @return a ResponseEntity containing the updated contact
     */
    @PutMapping("/{id}")
    public ResponseEntity<Contact> updateContact(@PathVariable Long id, @RequestBody Contact contact) {
        Contact updated = contactService.updateContact(id, contact);
        return ResponseEntity.ok(updated);
    }
}