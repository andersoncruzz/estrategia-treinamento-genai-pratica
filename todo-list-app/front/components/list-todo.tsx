import { useEffect, useState } from "react";
import { API_URL, createTask, updateTask } from "../lib/api";
import { Task, Status, Priority } from "../types/task";
import TaskForm from "./task-form";

export default function ListTodo() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [filterPriority, setFilterPriority] = useState<Priority | "">("");
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  useEffect(() => {
    let url = `${API_URL}/tasks`;
    if (filterPriority) {
      url = `${API_URL}/tasks/filter?priority=${filterPriority}`;
    }
    fetch(url)
      .then((res) => res.json())
      .then((data) => setTasks(data));
  }, [filterPriority]);

  const handleSelectTask = (id: number) => {
    fetch(`${API_URL}/tasks/${id}`)
      .then((res) => res.json())
      .then((data) => setSelectedTask(data));
  };

  const handleDelete = (id: number) => {
    fetch(`${API_URL}/tasks/${id}`, { method: "DELETE" })
      .then(() => setTasks((prev) => prev.filter((t) => t.id !== id)));
  };

  const handleCreate = async (task: Omit<Task, "id">) => {
    const newTask = await createTask(task);
    setTasks((prev) => [...prev, newTask]);
    setShowForm(false);
  };

  const handleEdit = (task: Task) => {
    setEditingTask(task);
    setShowForm(true);
  };

  const handleUpdate = async (taskData: Omit<Task, "id">) => {
    if (!editingTask) return;
    const updated = await updateTask(editingTask.id, taskData);
    setTasks((prev) => prev.map((t) => (t.id === updated.id ? updated : t)));
    setEditingTask(null);
    setShowForm(false);
  };

  return (
    <div>
      <button onClick={() => { setShowForm(true); setEditingTask(null); }} style={{ marginBottom: 16 }}>Nova Tarefa</button>
      {showForm && (
        <TaskForm
          key={editingTask ? editingTask.id : "new"}
          task={editingTask || undefined}
          onSubmit={editingTask ? handleUpdate : handleCreate}
          onCancel={() => { setShowForm(false); setEditingTask(null); }}
        />
      )}
      <div>
        <label>Filtrar por prioridade: </label>
        <select value={filterPriority} onChange={e => setFilterPriority(e.target.value as Priority | "") }>
          <option value="">Todas</option>
          <option value={Priority.HIGH}>Alta</option>
          <option value={Priority.MEDIUM}>Média</option>
          <option value={Priority.LOW}>Baixa</option>
        </select>
      </div>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <span onClick={() => handleSelectTask(task.id)} style={{ cursor: 'pointer', textDecoration: selectedTask?.id === task.id ? 'underline' : 'none' }}>
              {task.taskName} - {task.status} - {task.priority}
            </span>
            <button onClick={() => { setEditingTask(task); setShowForm(true); }} style={{ marginLeft: 8 }}>Editar</button>
            <button onClick={() => handleDelete(task.id)} style={{ marginLeft: 8 }}>Excluir</button>
          </li>
        ))}
      </ul>
      {selectedTask && (
        <div style={{ marginTop: 16, border: '1px solid #ccc', padding: 8 }}>
          <h4>Detalhes da tarefa</h4>
          <div>ID: {selectedTask.id}</div>
          <div>Nome: {selectedTask.taskName}</div>
          <div>Status: {selectedTask.status}</div>
          <div>Prioridade: {selectedTask.priority}</div>
        </div>
      )}
    </div>
  );
}