package br.gov.am.semef.agendamentosala.repository;

import br.gov.am.semef.agendamentosala.model.DiaCalendario;
import br.gov.am.semef.agendamentosala.model.HorarioDisponivel;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.beans.factory.annotation.Autowired;
import java.time.LocalDate;
import java.time.LocalTime;
import static org.junit.jupiter.api.Assertions.*;

@DataJpaTest
class HorarioDisponivelRepositoryTest {
    @Autowired HorarioDisponivelRepository horarioRepository;
    @Autowired DiaCalendarioRepository diaRepository;

    @Test
    void testSalvarEBuscarHorario() {
        DiaCalendario dia = new DiaCalendario(LocalDate.now());
        diaRepository.save(dia);
        HorarioDisponivel horario = new HorarioDisponivel(LocalTime.of(14,0));
        horario.setDia(dia);
        horarioRepository.save(horario);
        assertFalse(horarioRepository.findAll().isEmpty());
        assertEquals(LocalTime.of(14,0), horarioRepository.findAll().get(0).getHorario());
    }
}
