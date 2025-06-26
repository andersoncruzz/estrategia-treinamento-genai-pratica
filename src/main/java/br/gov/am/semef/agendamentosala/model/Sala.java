package br.gov.am.semef.agendamentosala.model;

import jakarta.persistence.*;
import java.util.*;
import com.fasterxml.jackson.annotation.JsonManagedReference;

@Entity
public class Sala {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nome;

    @OneToMany(mappedBy = "sala", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<Reserva> reservas = new ArrayList<>();

    public Sala() {}
    public Sala(String nome) { this.nome = nome; }
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getNome() { return nome; }
    public void setNome(String nome) { this.nome = nome; }
    public List<Reserva> getReservas() { return reservas; }
    public void setReservas(List<Reserva> reservas) { this.reservas = reservas; }
}