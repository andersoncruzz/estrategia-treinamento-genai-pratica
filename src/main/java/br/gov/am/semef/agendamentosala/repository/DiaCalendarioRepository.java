package br.gov.am.semef.agendamentosala.repository;

import br.gov.am.semef.agendamentosala.model.DiaCalendario;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DiaCalendarioRepository extends JpaRepository<DiaCalendario, Long> {
    DiaCalendario findByData(java.time.LocalDate data);
}
