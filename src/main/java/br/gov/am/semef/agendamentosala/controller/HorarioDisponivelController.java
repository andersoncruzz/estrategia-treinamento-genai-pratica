package br.gov.am.semef.agendamentosala.controller;

import br.gov.am.semef.agendamentosala.model.HorarioDisponivel;
import br.gov.am.semef.agendamentosala.repository.HorarioDisponivelRepository;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/horarios")
public class HorarioDisponivelController {
    private final HorarioDisponivelRepository horarioRepository;
    public HorarioDisponivelController(HorarioDisponivelRepository horarioRepository) { this.horarioRepository = horarioRepository; }

    @GetMapping
    public List<HorarioDisponivel> listar() { return horarioRepository.findAll(); }

    @PostMapping
    public HorarioDisponivel criar(@RequestBody HorarioDisponivel horario) { return horarioRepository.save(horario); }
}
