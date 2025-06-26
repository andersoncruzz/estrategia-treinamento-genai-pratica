package br.gov.am.semef.agendamentosala.model;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;
import static org.mockito.Mockito.*;
import java.time.LocalDate;
import java.time.LocalTime;
import static org.junit.jupiter.api.Assertions.*;

@ExtendWith(MockitoExtension.class)
class DiaCalendarioTest {
    @Test
    void testCriacaoDiaCalendario() {
        LocalDate data = LocalDate.of(2025, 6, 26);
        DiaCalendario dia = new DiaCalendario(data);
        assertEquals(data, dia.getData());
        assertNotNull(dia.getHorarios());
        assertTrue(dia.getHorarios().isEmpty());
    }

    @Test
    void testAdicionarHorario() {
        DiaCalendario dia = new DiaCalendario(LocalDate.now());
        HorarioDisponivel horarioMock = mock(HorarioDisponivel.class);
        when(horarioMock.getHorario()).thenReturn(LocalTime.of(10, 0));
        dia.getHorarios().add(horarioMock);
        assertEquals(1, dia.getHorarios().size());
        assertEquals(LocalTime.of(10, 0), dia.getHorarios().get(0).getHorario());
        verify(horarioMock, atLeastOnce()).getHorario();
    }
}
