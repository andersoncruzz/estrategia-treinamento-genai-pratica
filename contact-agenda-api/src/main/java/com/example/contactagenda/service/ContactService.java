package com.example.contactagenda.service;

import com.example.contactagenda.model.Contact;
import com.example.contactagenda.repository.ContactRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ContactService {

    @Autowired
    private ContactRepository contactRepository;

    public Contact addContact(Contact contact) {
        return contactRepository.save(contact);
    }

    public List<Contact> getAllContacts() {
        return contactRepository.findAll();
    }

    public Optional<Contact> getContactById(Long id) {
        return contactRepository.findById(id);
    }

    public List<Contact> searchContactsByName(String name) {
        return contactRepository.findByNameContainingIgnoreCase(name);
    }

    public void deleteContact(Long id) {
        contactRepository.deleteById(id);
    }

    public Contact updateContact(Long id, Contact contact) {
        Contact existing = contactRepository.findById(id)
            .orElseThrow(() -> new IllegalArgumentException("Contato não encontrado"));
        existing.setName(contact.getName());
        existing.setPhone(contact.getPhone());
        existing.setEmail(contact.getEmail());
        existing.setNotes(contact.getNotes());
        return contactRepository.save(existing);
    }
}