package br.gov.am.semef.agendamentosala.model;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;
import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

@ExtendWith(MockitoExtension.class)
class ReservaTest {
    @Test
    void testCriacaoReserva() {
        Sala salaMock = mock(Sala.class);
        HorarioDisponivel horarioMock = mock(HorarioDisponivel.class);
        Reserva reserva = new Reserva(salaMock, horarioMock, "João");
        assertEquals(salaMock, reserva.getSala());
        assertEquals(horarioMock, reserva.getHorarioDisponivel());
        assertEquals("João", reserva.getUsuario());
    }

    @Test
    void testSettersEGettersComMock() {
        Sala salaMock = mock(Sala.class);
        HorarioDisponivel horarioMock = mock(HorarioDisponivel.class);
        Reserva reserva = new Reserva();
        reserva.setSala(salaMock);
        reserva.setHorarioDisponivel(horarioMock);
        reserva.setUsuario("Maria");
        assertEquals(salaMock, reserva.getSala());
        assertEquals(horarioMock, reserva.getHorarioDisponivel());
        assertEquals("Maria", reserva.getUsuario());
    }
}
