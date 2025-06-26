package br.gov.am.semef.agendamentosala.service;

import br.gov.am.semef.agendamentosala.model.Reserva;
import br.gov.am.semef.agendamentosala.model.HorarioDisponivel;
import br.gov.am.semef.agendamentosala.repository.ReservaRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class ReservaService {
    private final ReservaRepository reservaRepository;
    public ReservaService(ReservaRepository reservaRepository) {
        this.reservaRepository = reservaRepository;
    }

    public List<Reserva> listarReservas() {
        return reservaRepository.findAll();
    }

    public Reserva criarReserva(Reserva reserva) {
        return reservaRepository.save(reserva);
    }

    public List<Reserva> listarPorSala(String nomeSala) {
        return reservaRepository.findBySala_Nome(nomeSala);
    }

    public List<Reserva> listarPorHorarioDisponivel(HorarioDisponivel horarioDisponivel) {
        return reservaRepository.findByHorarioDisponivel(horarioDisponivel);
    }

    public List<Reserva> listarPorDia(Long diaId) {
        return reservaRepository.findByHorarioDisponivel_Dia_Id(diaId);
    }
}
