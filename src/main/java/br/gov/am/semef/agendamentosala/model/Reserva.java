package br.gov.am.semef.agendamentosala.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;

@Entity
public class Reserva {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "sala_id")
    @JsonBackReference
    private Sala sala;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "horario_disponivel_id")
    private HorarioDisponivel horarioDisponivel;

    private String usuario;

    public Reserva() {}

    public Reserva(Sala sala, HorarioDisponivel horarioDisponivel, String usuario) {
        this.sala = sala;
        this.horarioDisponivel = horarioDisponivel;
        this.usuario = usuario;
    }

    public Long getId() { return id; }
    public Sala getSala() { return sala; }
    public HorarioDisponivel getHorarioDisponivel() { return horarioDisponivel; }
    public String getUsuario() { return usuario; }

    public void setSala(Sala sala) { this.sala = sala; }
    public void setHorarioDisponivel(HorarioDisponivel horarioDisponivel) { this.horarioDisponivel = horarioDisponivel; }
    public void setUsuario(String usuario) { this.usuario = usuario; }
}
