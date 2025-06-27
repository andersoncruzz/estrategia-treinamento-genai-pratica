package com.example.contactagenda;

import com.example.contactagenda.model.Contact;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import java.util.List;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import org.springframework.transaction.annotation.Transactional;


@SpringBootTest
@AutoConfigureMockMvc
@Transactional
public class ContactControllerTest {
    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    private Contact contact;

    @BeforeEach
    void setUp() {
        contact = new Contact();
        contact.setId(1L);
        contact.setName("John Doe");
        contact.setPhone("123456789");
        contact.setEmail("john@example.com");
        contact.setNotes("Test contact");
    }

    @Test
    void testAddContact() throws Exception {
        mockMvc.perform(post("/api/contacts")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(contact)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.name").value("John Doe"));
    }

    @Test
    void testGetAllContacts() throws Exception {
        mockMvc.perform(get("/api/contacts"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON));
    }

    @Test
    void testSearchContactsByName() throws Exception {
        // First, add a contact
        mockMvc.perform(post("/api/contacts")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(contact)))
                .andExpect(status().isOk());

        // Then, search by name
        mockMvc.perform(get("/api/contacts/search")
                .param("name", "John"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].name").value("John Doe"));
    }

    @Test
    void testUpdateContact() throws Exception {
        // Adiciona um contato
        String response = mockMvc.perform(post("/api/contacts")
            .contentType(MediaType.APPLICATION_JSON)
            .content(objectMapper.writeValueAsString(contact)))
            .andExpect(status().isOk())
            .andReturn().getResponse().getContentAsString();

        Long id = objectMapper.readTree(response).get("id").asLong();

        // Atualiza o contato
        contact.setName("John Updated");
        mockMvc.perform(put("/api/contacts/" + id)
            .contentType(MediaType.APPLICATION_JSON)
            .content(objectMapper.writeValueAsString(contact)))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.name").value("John Updated"));
    }

    @Test
    void testDeleteContact() throws Exception {
        // Adiciona um contato
        mockMvc.perform(post("/api/contacts")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(contact)))
                .andExpect(status().isOk());

        // Remove o contato
        mockMvc.perform(delete("/api/contacts/1"))
                .andExpect(status().isNoContent());

        // Verifica que não existe mais
        mockMvc.perform(get("/api/contacts/1"))
                .andExpect(status().isNotFound());
    }
}
