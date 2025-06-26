package br.gov.am.semef.agendamentosala.service;

import br.gov.am.semef.agendamentosala.model.DiaCalendario;
import br.gov.am.semef.agendamentosala.repository.DiaCalendarioRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import java.time.LocalDate;
import java.util.List;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class CalendarioServiceTest {
    @Mock DiaCalendarioRepository diaRepository;
    @InjectMocks CalendarioService service;

    @Test
    void testListarDias() {
        when(diaRepository.findAll()).thenReturn(List.of(new DiaCalendario(LocalDate.now())));
        List<DiaCalendario> dias = service.listarDias();
        assertEquals(1, dias.size());
        verify(diaRepository).findAll();
    }

    @Test
    void testCriarDia() {
        DiaCalendario dia = new DiaCalendario(LocalDate.now());
        when(diaRepository.save(dia)).thenReturn(dia);
        DiaCalendario salvo = service.criarDia(dia);
        assertEquals(dia, salvo);
        verify(diaRepository).save(dia);
    }

    @Test
    void testBuscarPorData() {
        LocalDate data = LocalDate.now();
        DiaCalendario dia = new DiaCalendario(data);
        when(diaRepository.findByData(data)).thenReturn(dia);
        DiaCalendario result = service.buscarPorData(data);
        assertEquals(dia, result);
        verify(diaRepository).findByData(data);
    }
}
