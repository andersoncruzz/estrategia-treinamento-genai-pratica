package br.gov.am.semef.agendamentosala.controller;

import br.gov.am.semef.agendamentosala.model.DiaCalendario;
import br.gov.am.semef.agendamentosala.repository.DiaCalendarioRepository;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/dias")
public class DiaCalendarioController {
    private final DiaCalendarioRepository diaRepository;
    public DiaCalendarioController(DiaCalendarioRepository diaRepository) { this.diaRepository = diaRepository; }

    @GetMapping
    public List<DiaCalendario> listar() { return diaRepository.findAll(); }

    @PostMapping
    public DiaCalendario criar(@RequestBody DiaCalendario dia) { return diaRepository.save(dia); }
}
