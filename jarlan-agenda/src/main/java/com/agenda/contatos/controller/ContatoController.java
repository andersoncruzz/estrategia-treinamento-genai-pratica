package com.agenda.contatos.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import com.agenda.contatos.model.Contato;
import com.agenda.contatos.repository.ContatoRepository;
import com.agenda.contatos.exception.ResourceNotFoundException;

import jakarta.validation.Valid;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/contatos")
public class ContatoController {

    @Autowired
    private ContatoRepository contatoRepository;

    public ContatoController() {
    }

    @PostMapping
    public Contato criarContato(@Valid @RequestBody Contato contato) {
        Contato contatoSalvo = contatoRepository.save(contato);
        return contatoRepository.save(contatoSalvo);
    }

    @PostMapping("/batch")
    public List<Contato> criarContatos(@Valid @RequestBody List<Contato> contatos) {
        return contatoRepository.saveAll(contatos);
    }

    @GetMapping
    public List<Contato> listarContatos() {
        return contatoRepository.findAll().stream()
                .sorted((c1, c2) -> {
                    if (c1.getNome() == null && c2.getNome() == null) return 0;
                    if (c1.getNome() == null) return 1;
                    if (c2.getNome() == null) return -1;
                    return c1.getNome().compareToIgnoreCase(c2.getNome());
                })
                .toList();
    }

    @GetMapping("/{id}")
    public Contato buscarContatoPorId (@PathVariable Long id) {
        return contatoRepository.findById(id)
                .orElseThrow(() -> (new ResourceNotFoundException("Contato não encontrado com o ID: " + id)));
    }

    @GetMapping("/getById/{id}")
    public Contato getById(@PathVariable Long id) {
        return contatoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Contato não encontrado com o ID: " + id));
    }

    @GetMapping("/getByName/{nome}")
    public List<Contato> buscarContatoPorNome(@PathVariable String nome) {
        return contatoRepository.findAll().stream()
                .filter(contato -> contato.getNome() != null && contato.getNome().toLowerCase().startsWith(nome.toLowerCase()))
                .toList();
    }

    @PutMapping("/{id}")
    public Contato atualizarContato(@PathVariable Long id,
                                                   @Valid @RequestBody Contato contatoAtualizado) {
        Contato contatoExistente = contatoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Contato não encontrado com o ID: " + id));

        contatoExistente.setNome(contatoAtualizado.getNome());
        contatoExistente.setEmail(contatoAtualizado.getEmail());
        contatoExistente.setTelefone(contatoAtualizado.getTelefone());
        contatoExistente.setObservacao(contatoAtualizado.getObservacao());
        return contatoRepository.save(contatoExistente);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deletarContato(@PathVariable Long id) {
        Contato contatoExistente = contatoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Contato não encontrado com o ID: " + id));

        contatoRepository.delete(contatoExistente);
    }
}