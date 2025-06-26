package br.gov.am.semef.agendamentosala.model;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;
import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;
import java.time.LocalTime;

@ExtendWith(MockitoExtension.class)
class HorarioDisponivelTest {
    @Test
    void testCriacaoHorario() {
        LocalTime horario = LocalTime.of(14, 0);
        HorarioDisponivel h = new HorarioDisponivel(horario);
        assertEquals(horario, h.getHorario());
        assertFalse(h.isReservado());
    }

    @Test
    void testReservarHorario() {
        HorarioDisponivel h = new HorarioDisponivel(LocalTime.of(15, 0));
        h.setReservado(true);
        assertTrue(h.isReservado());
    }

    @Test
    void testSetDiaComMock() {
        HorarioDisponivel h = new HorarioDisponivel(LocalTime.of(16, 0));
        DiaCalendario diaMock = mock(DiaCalendario.class);
        h.setDia(diaMock);
        assertEquals(diaMock, h.getDia());
        verifyNoInteractions(diaMock);
    }
}
