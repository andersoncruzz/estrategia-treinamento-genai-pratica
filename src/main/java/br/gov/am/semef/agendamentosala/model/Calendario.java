package br.gov.am.semef.agendamentosala.model;

import java.time.LocalDate;
import java.util.*;

public class Calendario {
    private Map<LocalDate, DiaCalendario> dias = new HashMap<>();

    public DiaCalendario getOuCriaDia(LocalDate data) {
        return dias.computeIfAbsent(data, DiaCalendario::new);
    }

    public Optional<DiaCalendario> getDia(LocalDate data) {
        return Optional.ofNullable(dias.get(data));
    }

    public Collection<DiaCalendario> getTodosDias() {
        return dias.values();
    }
}