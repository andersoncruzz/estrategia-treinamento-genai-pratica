package br.gov.am.semef.agendamentosala.controller;

import br.gov.am.semef.agendamentosala.model.Reserva;
import br.gov.am.semef.agendamentosala.model.HorarioDisponivel;
import br.gov.am.semef.agendamentosala.repository.ReservaRepository;
import br.gov.am.semef.agendamentosala.repository.HorarioDisponivelRepository;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/reservas")
public class ReservaController {
    private final ReservaRepository reservaRepository;
    private final HorarioDisponivelRepository horarioDisponivelRepository;
    public ReservaController(ReservaRepository reservaRepository, HorarioDisponivelRepository horarioDisponivelRepository) {
        this.reservaRepository = reservaRepository;
        this.horarioDisponivelRepository = horarioDisponivelRepository;
    }

    @GetMapping
    public List<Reserva> listar() { return reservaRepository.findAll(); }

    @PostMapping
    public Reserva criar(@RequestBody Reserva reserva) { return reservaRepository.save(reserva); }

    @GetMapping("/sala/{nomeSala}")
    public List<Reserva> listarPorSala(@PathVariable String nomeSala) {
        return reservaRepository.findBySala_Nome(nomeSala);
    }

    @GetMapping("/horario/{horarioId}")
    public List<Reserva> listarPorHorario(@PathVariable Long horarioId) {
        HorarioDisponivel horario = horarioDisponivelRepository.findById(horarioId).orElse(null);
        if (horario == null) return List.of();
        return reservaRepository.findByHorarioDisponivel(horario);
    }

    @GetMapping("/dia/{diaId}")
    public List<Reserva> listarPorDia(@PathVariable Long diaId) {
        return reservaRepository.findByHorarioDisponivel_Dia_Id(diaId);
    }
}
