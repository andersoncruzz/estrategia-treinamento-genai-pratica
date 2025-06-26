package br.gov.am.semef.agendamentosala.service;

import br.gov.am.semef.agendamentosala.model.DiaCalendario;
import br.gov.am.semef.agendamentosala.repository.DiaCalendarioRepository;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.util.List;

@Service
public class CalendarioService {
    private final DiaCalendarioRepository diaRepository;
    public CalendarioService(DiaCalendarioRepository diaRepository) {
        this.diaRepository = diaRepository;
    }

    public List<DiaCalendario> listarDias() {
        return diaRepository.findAll();
    }

    public DiaCalendario criarDia(DiaCalendario dia) {
        return diaRepository.save(dia);
    }

    public DiaCalendario buscarPorData(LocalDate data) {
        return diaRepository.findByData(data);
    }
}
