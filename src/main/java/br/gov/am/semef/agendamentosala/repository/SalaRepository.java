package br.gov.am.semef.agendamentosala.repository;

import br.gov.am.semef.agendamentosala.model.Sala;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SalaRepository extends JpaRepository<Sala, Long> {
    Sala findByNome(String nome);
}
