package com.example.todolist.repository;

import com.example.todolist.model.Task;
import com.example.todolist.enums.Priority;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {
    // Método personalizado para filtrar por prioridade
    java.util.List<Task> findByPriority(Priority priority);
}