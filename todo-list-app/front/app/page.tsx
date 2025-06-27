"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Search, Filter } from "lucide-react"
import { Task, Status, Priority } from "../types/task"
import TaskForm from "../components/task-form"
import TaskItem from "../components/task-item"
import TaskStats from "../components/task-stats"
import { API_URL, createTask, updateTask, deleteTask, fetchTasks } from "../lib/api"

export default function TaskCRUD() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [editingTask, setEditingTask] = useState<Task | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterPriority, setFilterPriority] = useState<"all" | Priority>("all")

  // Carregar tarefas do backend na inicialização
  useEffect(() => {
    fetchTasks().then(setTasks)
  }, [])

  // Adicionar tarefa
  const handleAddTask = async (taskData: Omit<Task, "id">) => {
    const newTask = await createTask(taskData)
    setTasks((prev) => [newTask, ...prev])
    setShowForm(false)
  }

  // Editar tarefa
  const handleEditTask = async (taskData: Omit<Task, "id">) => {
    if (!editingTask) return
    const updatedTask = await updateTask(editingTask.id, taskData)
    setTasks((prev) =>
      prev.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    )
    setEditingTask(null)
    setShowForm(false)
  }

  // Excluir tarefa
  const handleDeleteTask = async (id: number) => {
    await deleteTask(id)
    setTasks((prev) => prev.filter((task) => task.id !== id))
  }

  // Filtro de busca e prioridade
  const filteredTasks = tasks.filter((task) => {
    const matchesSearch =
      task.taskName.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesPriority =
      filterPriority === "all" || task.priority === filterPriority
    return matchesSearch && matchesPriority
  })

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Gerenciador de Tarefas</h1>
          <p className="text-gray-600">Organize suas tarefas de forma simples e eficiente</p>
        </div>

        {/* Stats */}
        <TaskStats tasks={tasks} />

        {/* Controls */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Buscar tarefas..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          <Select
            value={filterPriority}
            onValueChange={(value: "all" | Priority) => setFilterPriority(value)}
          >
            <SelectTrigger className="w-full sm:w-48">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas as prioridades</SelectItem>
              <SelectItem value={Priority.HIGH as any}>🔴 Alta prioridade</SelectItem>
              <SelectItem value={Priority.MEDIUM as any}>🟡 Média prioridade</SelectItem>
              <SelectItem value={Priority.LOW as any}>🟢 Baixa prioridade</SelectItem>
            </SelectContent>
          </Select>

          <Button onClick={() => setShowForm(true)} className="w-full sm:w-auto">
            <Plus className="h-4 w-4 mr-2" />
            Nova Tarefa
          </Button>
        </div>

        {/* Form */}
        {showForm && (
          <TaskForm
            key={editingTask ? editingTask.id : "new"}
            task={editingTask || undefined}
            onSubmit={editingTask ? handleEditTask : handleAddTask}
            onCancel={() => {
              setEditingTask(null)
              setShowForm(false)
            }}
          />
        )}

        {/* Task List */}
        <div className="space-y-4">
          {filteredTasks.length === 0 ? (
            <div className="text-center py-12 text-gray-400">
              {searchTerm || filterPriority !== "all" ? (
                <p>Nenhuma tarefa encontrada com os filtros aplicados.</p>
              ) : (
                <p>Você ainda não tem tarefas cadastradas.</p>
              )}
              {!showForm && !searchTerm && filterPriority === "all" && (
                <Button onClick={() => setShowForm(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Criar primeira tarefa
                </Button>
              )}
            </div>
          ) : (
            filteredTasks.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                onEdit={(task) => {
                  setEditingTask(task);
                  setShowForm(true);
                }}
                onDelete={handleDeleteTask}
              />
            ))
          )}
        </div>
      </div>
    </div>
  )
}
