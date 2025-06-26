package br.gov.am.semef.agendamentosala.controller;

import br.gov.am.semef.agendamentosala.model.Sala;
import br.gov.am.semef.agendamentosala.repository.SalaRepository;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/salas")
public class SalaController {
    private final SalaRepository salaRepository;
    public SalaController(SalaRepository salaRepository) { this.salaRepository = salaRepository; }

    @GetMapping
    public List<Sala> listar() { return salaRepository.findAll(); }

    @PostMapping
    public Sala criar(@RequestBody Sala sala) { return salaRepository.save(sala); }

    @GetMapping("/{id}")
    public Sala buscar(@PathVariable Long id) { return salaRepository.findById(id).orElse(null); }
}
