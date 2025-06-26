package br.gov.am.semef.agendamentosala.model;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;
import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

@ExtendWith(MockitoExtension.class)
class SalaTest {
    @Test
    void testCriacaoSala() {
        Sala sala = new Sala("Sala 101");
        assertEquals("Sala 101", sala.getNome());
        assertNotNull(sala.getReservas());
        assertTrue(sala.getReservas().isEmpty());
    }

    @Test
    void testAdicionarReservaComMock() {
        Sala sala = new Sala("Sala 102");
        Reserva reservaMock = mock(Reserva.class);
        sala.getReservas().add(reservaMock);
        assertEquals(1, sala.getReservas().size());
        assertSame(reservaMock, sala.getReservas().get(0));
        verifyNoInteractions(reservaMock);
    }
}
