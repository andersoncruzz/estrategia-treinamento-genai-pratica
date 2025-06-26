package br.gov.am.semef.agendamentosala.controller;

import br.gov.am.semef.agendamentosala.model.Sala;
import br.gov.am.semef.agendamentosala.dto.SalaDTO;
import br.gov.am.semef.agendamentosala.dto.SalaResponseDTO;
import br.gov.am.semef.agendamentosala.repository.SalaRepository;
import br.gov.am.semef.agendamentosala.mapper.SalaMapper;
import br.gov.am.semef.agendamentosala.mapper.SalaResponseMapper;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/salas")
public class SalaController {
    private final SalaRepository salaRepository;
    private final SalaMapper salaMapper;
    private final SalaResponseMapper salaResponseMapper;

    public SalaController(SalaRepository salaRepository, SalaMapper salaMapper, SalaResponseMapper salaResponseMapper) {
        this.salaRepository = salaRepository;
        this.salaMapper = salaMapper;
        this.salaResponseMapper = salaResponseMapper;
    }

    @GetMapping
    public List<SalaResponseDTO> listar() {
        return salaResponseMapper.toResponseDtoList(salaRepository.findAll());
    }

    @PostMapping
    public SalaDTO criar(@RequestBody SalaDTO salaDTO) {
        Sala sala = salaMapper.toEntity(salaDTO);
        Sala saved = salaRepository.save(sala);
        return salaMapper.toDto(saved);
    }

    @GetMapping("/{id}")
    public SalaDTO buscar(@PathVariable Long id) {
        return salaRepository.findById(id)
                .map(salaMapper::toDto)
                .orElse(null);
    }
}
