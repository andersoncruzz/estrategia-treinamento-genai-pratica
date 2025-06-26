package br.gov.am.semef.agendamentosala.repository;

import br.gov.am.semef.agendamentosala.model.DiaCalendario;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.beans.factory.annotation.Autowired;
import java.time.LocalDate;
import static org.junit.jupiter.api.Assertions.*;

@DataJpaTest
class DiaCalendarioRepositoryTest {
    @Autowired DiaCalendarioRepository diaRepository;

    @Test
    void testSalvarEBuscarDia() {
        LocalDate data = LocalDate.of(2025, 6, 26);
        DiaCalendario dia = new DiaCalendario(data);
        diaRepository.save(dia);
        DiaCalendario encontrado = diaRepository.findByData(data);
        assertNotNull(encontrado);
        assertEquals(data, encontrado.getData());
    }
}
