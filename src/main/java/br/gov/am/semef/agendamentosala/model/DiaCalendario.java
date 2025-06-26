package br.gov.am.semef.agendamentosala.model;

import jakarta.persistence.*;
import java.time.LocalDate;
import java.util.*;

import com.fasterxml.jackson.annotation.JsonManagedReference;

@Entity
public class DiaCalendario {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private LocalDate data;

    @OneToMany(mappedBy = "dia", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<HorarioDisponivel> horarios = new ArrayList<>();

    public DiaCalendario() {}
    public DiaCalendario(LocalDate data) { this.data = data; }
    public Long getId() { return id; }
    public LocalDate getData() { return data; }
    public void setData(LocalDate data) { this.data = data; }
    public List<HorarioDisponivel> getHorarios() { return horarios; }
    public void setHorarios(List<HorarioDisponivel> horarios) { this.horarios = horarios; }
}
