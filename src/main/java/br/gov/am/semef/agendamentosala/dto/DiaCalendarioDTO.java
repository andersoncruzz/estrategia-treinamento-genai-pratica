package br.gov.am.semef.agendamentosala.dto;

import java.time.LocalDate;

public class DiaCalendarioDTO {
    private Long id;
    private LocalDate data;

    public DiaCalendarioDTO() {}

    public DiaCalendarioDTO(Long id, LocalDate data) {
        this.id = id;
        this.data = data;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getData() {
        return data;
    }

    public void setData(LocalDate data) {
        this.data = data;
    }
}
