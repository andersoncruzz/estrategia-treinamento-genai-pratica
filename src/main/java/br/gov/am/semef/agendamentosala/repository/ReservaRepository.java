package br.gov.am.semef.agendamentosala.repository;

import br.gov.am.semef.agendamentosala.model.Reserva;
import br.gov.am.semef.agendamentosala.model.HorarioDisponivel;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ReservaRepository extends JpaRepository<Reserva, Long> {
    List<Reserva> findBySala_Nome(String nomeSala);
    List<Reserva> findByHorarioDisponivel(HorarioDisponivel horarioDisponivel);
    List<Reserva> findByHorarioDisponivel_Dia_Id(Long diaId);
}
