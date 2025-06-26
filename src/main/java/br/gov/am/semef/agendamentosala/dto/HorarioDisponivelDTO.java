package br.gov.am.semef.agendamentosala.dto;

import java.time.LocalTime;

public class HorarioDisponivelDTO {
    private Long id;
    private LocalTime horario;
    private boolean reservado;

    public HorarioDisponivelDTO() {}

    public HorarioDisponivelDTO(Long id, LocalTime horario, boolean reservado) {
        this.id = id;
        this.horario = horario;
        this.reservado = reservado;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public LocalTime getHorario() { return horario; }
    public void setHorario(LocalTime horario) { this.horario = horario; }
    public boolean isReservado() { return reservado; }
    public void setReservado(boolean reservado) { this.reservado = reservado; }
}
