package br.gov.am.semef.agendamentosala.controller;

import br.gov.am.semef.agendamentosala.model.Sala;
import br.gov.am.semef.agendamentosala.model.DiaCalendario;
import br.gov.am.semef.agendamentosala.model.HorarioDisponivel;
import br.gov.am.semef.agendamentosala.repository.ReservaRepository;
import br.gov.am.semef.agendamentosala.repository.SalaRepository;
import br.gov.am.semef.agendamentosala.repository.DiaCalendarioRepository;
import br.gov.am.semef.agendamentosala.repository.HorarioDisponivelRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import java.time.LocalDate;
import java.time.LocalTime;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
class ReservaControllerTest {
    @Autowired MockMvc mockMvc;
    @Autowired ReservaRepository reservaRepository;
    @Autowired SalaRepository salaRepository;
    @Autowired DiaCalendarioRepository diaCalendarioRepository;
    @Autowired HorarioDisponivelRepository horarioDisponivelRepository;

    @Test
    void testCriarEListarReserva() throws Exception {
        Sala sala = salaRepository.save(new Sala("Sala API"));
        DiaCalendario dia = diaCalendarioRepository.save(new DiaCalendario(LocalDate.of(2025, 6, 26)));
        HorarioDisponivel horario = new HorarioDisponivel(LocalTime.of(9,0));
        horario.setDia(dia);
        horario = horarioDisponivelRepository.save(horario);
        String reservaJson = String.format("{\"sala\":{\"id\":%d},\"horarioDisponivel\":{\"id\":%d},\"usuario\":\"Joao API\"}", sala.getId(), horario.getId());
        mockMvc.perform(post("/reservas")
                .contentType(MediaType.APPLICATION_JSON)
                .content(reservaJson))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.usuario").value("Joao API"));

        mockMvc.perform(get("/reservas"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].usuario").value("Joao API"));
    }
}
