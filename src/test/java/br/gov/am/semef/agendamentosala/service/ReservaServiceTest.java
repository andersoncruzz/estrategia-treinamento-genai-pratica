package br.gov.am.semef.agendamentosala.service;

import br.gov.am.semef.agendamentosala.model.Reserva;
import br.gov.am.semef.agendamentosala.model.HorarioDisponivel;
import br.gov.am.semef.agendamentosala.repository.ReservaRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import java.util.List;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class ReservaServiceTest {
    @Mock ReservaRepository reservaRepository;
    @InjectMocks ReservaService service;

    @Test
    void testListarReservas() {
        when(reservaRepository.findAll()).thenReturn(List.of(mock(Reserva.class)));
        List<Reserva> reservas = service.listarReservas();
        assertEquals(1, reservas.size());
        verify(reservaRepository).findAll();
    }

    @Test
    void testCriarReserva() {
        Reserva reserva = mock(Reserva.class);
        when(reservaRepository.save(reserva)).thenReturn(reserva);
        Reserva salvo = service.criarReserva(reserva);
        assertEquals(reserva, salvo);
        verify(reservaRepository).save(reserva);
    }

    @Test
    void testListarPorSala() {
        when(reservaRepository.findBySala_Nome("Sala 101")).thenReturn(List.of(mock(Reserva.class)));
        List<Reserva> reservas = service.listarPorSala("Sala 101");
        assertEquals(1, reservas.size());
        verify(reservaRepository).findBySala_Nome("Sala 101");
    }

    @Test
    void testListarPorHorarioDisponivel() {
        HorarioDisponivel horarioMock = mock(HorarioDisponivel.class);
        when(reservaRepository.findByHorarioDisponivel(horarioMock)).thenReturn(List.of(mock(Reserva.class)));
        List<Reserva> reservas = service.listarPorHorarioDisponivel(horarioMock);
        assertEquals(1, reservas.size());
        verify(reservaRepository).findByHorarioDisponivel(horarioMock);
    }

    @Test
    void testListarPorDia() {
        when(reservaRepository.findByHorarioDisponivel_Dia_Id(1L)).thenReturn(List.of(mock(Reserva.class)));
        List<Reserva> reservas = service.listarPorDia(1L);
        assertEquals(1, reservas.size());
        verify(reservaRepository).findByHorarioDisponivel_Dia_Id(1L);
    }
}
