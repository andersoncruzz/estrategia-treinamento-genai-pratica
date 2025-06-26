package br.gov.am.semef.agendamentosala.controller;

import br.gov.am.semef.agendamentosala.model.Reserva;
import br.gov.am.semef.agendamentosala.model.HorarioDisponivel;
import br.gov.am.semef.agendamentosala.dto.ReservaDTO;
import br.gov.am.semef.agendamentosala.dto.ReservaResponseDTO;
import br.gov.am.semef.agendamentosala.repository.ReservaRepository;
import br.gov.am.semef.agendamentosala.repository.HorarioDisponivelRepository;
import br.gov.am.semef.agendamentosala.mapper.ReservaMapper;
import br.gov.am.semef.agendamentosala.mapper.ReservaResponseMapper;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/reservas")
public class ReservaController {
    private final ReservaRepository reservaRepository;
    private final HorarioDisponivelRepository horarioDisponivelRepository;
    private final ReservaMapper reservaMapper;
    private final ReservaResponseMapper reservaResponseMapper;

    public ReservaController(ReservaRepository reservaRepository, HorarioDisponivelRepository horarioDisponivelRepository, ReservaMapper reservaMapper, ReservaResponseMapper reservaResponseMapper) {
        this.reservaRepository = reservaRepository;
        this.horarioDisponivelRepository = horarioDisponivelRepository;
        this.reservaMapper = reservaMapper;
        this.reservaResponseMapper = reservaResponseMapper;
    }

    @GetMapping
    public List<ReservaResponseDTO> listar() {
        return reservaResponseMapper.toResponseDtoList(reservaRepository.findAll());
    }

    @PostMapping
    public ReservaDTO criar(@RequestBody ReservaDTO dto) {
        Reserva reserva = reservaMapper.toEntity(dto);
        Reserva saved = reservaRepository.save(reserva);
        return reservaMapper.toDto(saved);
    }

    @GetMapping("/sala/{nomeSala}")
    public List<ReservaResponseDTO> listarPorSala(@PathVariable String nomeSala) {
        return reservaResponseMapper.toResponseDtoList(reservaRepository.findBySala_Nome(nomeSala));
    }

    @GetMapping("/horario/{horarioId}")
    public List<ReservaResponseDTO> listarPorHorario(@PathVariable Long horarioId) {
        HorarioDisponivel horario = horarioDisponivelRepository.findById(horarioId).orElse(null);
        if (horario == null) return List.of();
        return reservaResponseMapper.toResponseDtoList(reservaRepository.findByHorarioDisponivel(horario));
    }

    @GetMapping("/dia/{diaId}")
    public List<ReservaResponseDTO> listarPorDia(@PathVariable Long diaId) {
        return reservaResponseMapper.toResponseDtoList(reservaRepository.findByHorarioDisponivel_Dia_Id(diaId));
    }
}
