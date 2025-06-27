import { Task } from "../types/task";

export const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api";

export async function fetchTasks(): Promise<Task[]> {
  const res = await fetch(`${API_URL}/tasks`);
  if (!res.ok) throw new Error("Erro ao buscar tarefas");
  return res.json();
}

export async function createTask(task: Omit<Task, "id">): Promise<Task> {
  const response = await fetch(`${API_URL}/tasks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(task),
  });
  if (!response.ok) {
    throw new Error("Erro ao criar tarefa");
  }
  return response.json();
}

export async function updateTask(id: number, task: Omit<Task, "id">): Promise<Task> {
  const response = await fetch(`${API_URL}/tasks/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(task),
  });
  if (!response.ok) {
    throw new Error("Erro ao atualizar tarefa");
  }
  return response.json();
}

export async function deleteTask(id: number): Promise<void> {
  const response = await fetch(`${API_URL}/tasks/${id}`, { method: "DELETE" });
  if (!response.ok) {
    throw new Error("Erro ao excluir tarefa");
  }
}
