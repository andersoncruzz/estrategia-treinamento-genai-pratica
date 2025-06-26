package br.gov.am.semef.agendamentosala.controller;

import br.gov.am.semef.agendamentosala.model.HorarioDisponivel;
import br.gov.am.semef.agendamentosala.dto.HorarioDisponivelDTO;
import br.gov.am.semef.agendamentosala.dto.HorarioDisponivelResponseDTO;
import br.gov.am.semef.agendamentosala.repository.HorarioDisponivelRepository;
import br.gov.am.semef.agendamentosala.mapper.HorarioDisponivelMapper;
import br.gov.am.semef.agendamentosala.mapper.HorarioDisponivelResponseMapper;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/horarios")
public class HorarioDisponivelController {
    private final HorarioDisponivelRepository horarioRepository;
    private final HorarioDisponivelMapper horarioMapper;
    private final HorarioDisponivelResponseMapper horarioResponseMapper;

    public HorarioDisponivelController(HorarioDisponivelRepository horarioRepository, HorarioDisponivelMapper horarioMapper, HorarioDisponivelResponseMapper horarioResponseMapper) {
        this.horarioRepository = horarioRepository;
        this.horarioMapper = horarioMapper;
        this.horarioResponseMapper = horarioResponseMapper;
    }

    @GetMapping
    public List<HorarioDisponivelResponseDTO> listar() {
        return horarioResponseMapper.toResponseDtoList(horarioRepository.findAll());
    }

    @PostMapping
    public HorarioDisponivelDTO criar(@RequestBody HorarioDisponivelDTO dto) {
        HorarioDisponivel horario = horarioMapper.toEntity(dto);
        HorarioDisponivel saved = horarioRepository.save(horario);
        return horarioMapper.toDto(saved);
    }
}
