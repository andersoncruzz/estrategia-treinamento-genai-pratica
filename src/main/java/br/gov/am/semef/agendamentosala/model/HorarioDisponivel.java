package br.gov.am.semef.agendamentosala.model;

import jakarta.persistence.*;
import java.time.LocalTime;

import com.fasterxml.jackson.annotation.JsonBackReference;

@Entity
public class HorarioDisponivel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private LocalTime horario;
    private boolean reservado = false;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "dia_id")
    @JsonBackReference
    private DiaCalendario dia;

    public HorarioDisponivel() {}
    public HorarioDisponivel(LocalTime horario) { this.horario = horario; }
    public Long getId() { return id; }
    public LocalTime getHorario() { return horario; }
    public void setHorario(LocalTime horario) { this.horario = horario; }
    public boolean isReservado() { return reservado; }
    public void setReservado(boolean reservado) { this.reservado = reservado; }
    public DiaCalendario getDia() { return dia; }
    public void setDia(DiaCalendario dia) { this.dia = dia; }
}
