package br.gov.am.semef.agendamentosala.controller;

import br.gov.am.semef.agendamentosala.model.DiaCalendario;
import br.gov.am.semef.agendamentosala.repository.DiaCalendarioRepository;
import br.gov.am.semef.agendamentosala.repository.HorarioDisponivelRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import java.time.LocalDate;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
class HorarioDisponivelControllerTest {
    @Autowired MockMvc mockMvc;
    @Autowired HorarioDisponivelRepository horarioRepository;
    @Autowired DiaCalendarioRepository diaRepository;

    @Test
    void testCriarEListarHorario() throws Exception {
        DiaCalendario dia = diaRepository.save(new DiaCalendario(LocalDate.of(2025, 6, 26)));
        String horarioJson = String.format("{\"horario\":\"09:00:00\",\"reservado\":false,\"dia\":{\"id\":%d}}", dia.getId());
        mockMvc.perform(post("/horarios")
                .contentType(MediaType.APPLICATION_JSON)
                .content(horarioJson))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.horario").value("09:00:00"));

        mockMvc.perform(get("/horarios"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].horario").exists());
    }
}
