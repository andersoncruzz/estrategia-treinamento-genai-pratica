package br.gov.am.semef.agendamentosala.controller;

import br.gov.am.semef.agendamentosala.model.DiaCalendario;
import br.gov.am.semef.agendamentosala.dto.DiaCalendarioDTO;
import br.gov.am.semef.agendamentosala.dto.DiaCalendarioResponseDTO;
import br.gov.am.semef.agendamentosala.repository.DiaCalendarioRepository;
import br.gov.am.semef.agendamentosala.mapper.DiaCalendarioMapper;
import br.gov.am.semef.agendamentosala.mapper.DiaCalendarioResponseMapper;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/dias")
public class DiaCalendarioController {
    private final DiaCalendarioRepository diaRepository;
    private final DiaCalendarioMapper diaMapper;
    private final DiaCalendarioResponseMapper diaResponseMapper;

    public DiaCalendarioController(DiaCalendarioRepository diaRepository, DiaCalendarioMapper diaMapper, DiaCalendarioResponseMapper diaResponseMapper) {
        this.diaRepository = diaRepository;
        this.diaMapper = diaMapper;
        this.diaResponseMapper = diaResponseMapper;
    }

    @GetMapping
    public List<DiaCalendarioResponseDTO> listar() {
        return diaResponseMapper.toResponseDtoList(diaRepository.findAll());
    }

    @PostMapping
    public DiaCalendarioDTO criar(@RequestBody DiaCalendarioDTO dto) {
        DiaCalendario dia = diaMapper.toEntity(dto);
        DiaCalendario saved = diaRepository.save(dia);
        return diaMapper.toDto(saved);
    }
}
