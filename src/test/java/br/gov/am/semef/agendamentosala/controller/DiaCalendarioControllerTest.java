package br.gov.am.semef.agendamentosala.controller;

import br.gov.am.semef.agendamentosala.repository.DiaCalendarioRepository;
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
class DiaCalendarioControllerTest {
    @Autowired MockMvc mockMvc;
    @Autowired DiaCalendarioRepository diaRepository;

    @Test
    void testCriarEListarDia() throws Exception {
        mockMvc.perform(post("/dias")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"data\":\"2025-06-26\"}"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data").value("2025-06-26"));

        mockMvc.perform(get("/dias"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].data").exists());
    }
}
