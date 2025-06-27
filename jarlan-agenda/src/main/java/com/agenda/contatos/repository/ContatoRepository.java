package com.agenda.contatos.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.agenda.contatos.model.Contato;

@Repository
public interface ContatoRepository extends JpaRepository<Contato, Long> {}