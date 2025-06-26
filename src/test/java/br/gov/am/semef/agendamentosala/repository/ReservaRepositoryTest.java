package br.gov.am.semef.agendamentosala.repository;

import br.gov.am.semef.agendamentosala.model.*;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.beans.factory.annotation.Autowired;
import java.time.LocalDate;
import java.time.LocalTime;
import static org.junit.jupiter.api.Assertions.*;

@DataJpaTest
class ReservaRepositoryTest {
    @Autowired ReservaRepository reservaRepository;
    @Autowired SalaRepository salaRepository;
    @Autowired HorarioDisponivelRepository horarioDisponivelRepository;
    @Autowired DiaCalendarioRepository diaCalendarioRepository;

    @Test
    void testSalvarEBuscarReserva() {
        Sala sala = new Sala("Sala 101");
        salaRepository.save(sala);
        DiaCalendario dia = new DiaCalendario(LocalDate.now());
        diaCalendarioRepository.save(dia);
        HorarioDisponivel horario = new HorarioDisponivel(LocalTime.of(9,0));
        horario.setDia(dia);
        horarioDisponivelRepository.save(horario);
        Reserva reserva = new Reserva(sala, horario, "João");
        reservaRepository.save(reserva);
        assertFalse(reservaRepository.findAll().isEmpty());
        assertEquals("João", reservaRepository.findAll().get(0).getUsuario());
        assertEquals(horario, reservaRepository.findAll().get(0).getHorarioDisponivel());
    }
}
