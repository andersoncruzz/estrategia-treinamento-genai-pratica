package br.gov.am.semef.agendamentosala.repository;

import br.gov.am.semef.agendamentosala.model.HorarioDisponivel;
import org.springframework.data.jpa.repository.JpaRepository;

public interface HorarioDisponivelRepository extends JpaRepository<HorarioDisponivel, Long> {
}
