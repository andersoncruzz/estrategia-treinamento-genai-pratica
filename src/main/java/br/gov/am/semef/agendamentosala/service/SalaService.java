package br.gov.am.semef.agendamentosala.service;

import br.gov.am.semef.agendamentosala.model.Sala;
import java.util.*;

public class SalaService {
    private final Map<String, Sala> salas = new HashMap<>();

    public Sala criarSala(String nome) {
        Sala sala = new Sala(nome);
        salas.put(nome, sala);
        return sala;
    }

    public Optional<Sala> buscarSala(String nome) {
        return Optional.ofNullable(salas.get(nome));
    }

    public Collection<Sala> listarSalas() {
        return salas.values();
    }
}
