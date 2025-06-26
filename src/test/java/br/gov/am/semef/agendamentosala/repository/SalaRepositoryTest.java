package br.gov.am.semef.agendamentosala.repository;

import br.gov.am.semef.agendamentosala.model.Sala;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.beans.factory.annotation.Autowired;
import static org.junit.jupiter.api.Assertions.*;

@DataJpaTest
class SalaRepositoryTest {
    @Autowired SalaRepository salaRepository;

    @Test
    void testSalvarEBuscarSala() {
        Sala sala = new Sala("Sala 101");
        salaRepository.save(sala);
        Sala encontrada = salaRepository.findByNome("Sala 101");
        assertNotNull(encontrada);
        assertEquals("Sala 101", encontrada.getNome());
    }
}
