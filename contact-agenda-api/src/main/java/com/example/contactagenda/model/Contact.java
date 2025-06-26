package com.example.contactagenda.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

/**
 * Entidade que representa um contato na agenda.
 * <p>
 * Contém informações como id, nome, telefone, e-mail e observações.
 * </p>
 */
@Entity
public class Contact {
    /** Identificador único do contato. */
    @Id
    private Long id;
    /** Nome do contato. */
    private String name;
    /** Telefone do contato. */
    private String phone;
    /** E-mail do contato. */
    private String email;
    /** Observações adicionais sobre o contato. */
    private String notes;

    /**
     * Retorna o identificador do contato.
     * @return id do contato
     */
    public Long getId() {
        return id;
    }

    /**
     * Define o identificador do contato.
     * @param id identificador a ser definido
     */
    public void setId(Long id) {
        this.id = id;
    }

    /**
     * Retorna o nome do contato.
     * @return nome do contato
     */
    public String getName() {
        return name;
    }

    /**
     * Define o nome do contato.
     * @param name nome a ser definido
     */
    public void setName(String name) {
        this.name = name;
    }

    /**
     * Retorna o telefone do contato.
     * @return telefone do contato
     */
    public String getPhone() {
        return phone;
    }

    /**
     * Define o telefone do contato.
     * @param phone telefone a ser definido
     */
    public void setPhone(String phone) {
        this.phone = phone;
    }

    /**
     * Retorna o e-mail do contato.
     * @return e-mail do contato
     */
    public String getEmail() {
        return email;
    }

    /**
     * Define o e-mail do contato.
     * @param email e-mail a ser definido
     */
    public void setEmail(String email) {
        this.email = email;
    }

    /**
     * Retorna as observações do contato.
     * @return observações do contato
     */
    public String getNotes() {
        return notes;
    }

    /**
     * Define as observações do contato.
     * @param notes observações a serem definidas
     */
    public void setNotes(String notes) {
        this.notes = notes;
    }
}