package br.gov.am.semef.agendamentosala.controller;

import br.gov.am.semef.agendamentosala.model.Sala;
import br.gov.am.semef.agendamentosala.repository.SalaRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
class SalaControllerTest {
    @Autowired MockMvc mockMvc;
    @Autowired SalaRepository salaRepository;

    @Test
    void testCriarESalvarSala() throws Exception {
        mockMvc.perform(post("/salas")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"nome\":\"Sala Teste\"}"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.nome").value("Sala Teste"));
    }

    @Test
    void testListarSalas() throws Exception {
        salaRepository.save(new Sala("Sala Mock"));
        mockMvc.perform(get("/salas"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].nome").exists());
    }
}
