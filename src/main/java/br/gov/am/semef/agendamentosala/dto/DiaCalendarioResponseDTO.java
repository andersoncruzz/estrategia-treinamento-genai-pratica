package br.gov.am.semef.agendamentosala.dto;

import java.time.LocalDate;

public class DiaCalendarioResponseDTO {
    private Long id;
    private LocalDate data;

    public DiaCalendarioResponseDTO() {}

    public DiaCalendarioResponseDTO(Long id, LocalDate data) {
        this.id = id;
        this.data = data;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public LocalDate getData() { return data; }
    public void setData(LocalDate data) { this.data = data; }
}
