"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Task, Status, Priority } from "../types/task"

interface TaskFormProps {
  task?: Task
  onSubmit: (task: Omit<Task, "id">) => void
  onCancel: () => void
}

export default function TaskForm({ task, onSubmit, onCancel }: TaskFormProps) {
  const [taskName, setTaskName] = useState("")
  const [status, setStatus] = useState<Status>(Status.PENDING)
  const [priority, setPriority] = useState<Priority>(Priority.MEDIUM)

  useEffect(() => {
    if (task) {
      setTaskName(task.taskName || "");
      setStatus(
        task.status === Status.PENDING || task.status === Status.COMPLETED
          ? task.status
          : Status.PENDING
      );
      setPriority(
        task.priority === Priority.HIGH || task.priority === Priority.MEDIUM || task.priority === Priority.LOW
          ? task.priority
          : Priority.MEDIUM
      );
    } else {
      setTaskName("");
      setStatus(Status.PENDING);
      setPriority(Priority.MEDIUM);
    }
  }, [task])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!taskName.trim()) return

    onSubmit({
      taskName: taskName.trim(),
      status,
      priority,
    })

    if (!task) {
      setTaskName("")
      setStatus(Status.PENDING)
      setPriority(Priority.MEDIUM)
    }
  }

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>{task ? "Editar Tarefa" : "Nova Tarefa"}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="taskName">Nome da Tarefa</Label>
            <Input
              id="taskName"
              type="text"
              placeholder="Digite o nome da tarefa"
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select value={status} onValueChange={(value) => setStatus(value as Status)}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione o status">
                  {status === Status.PENDING ? "Pendente" : status === Status.COMPLETED ? "Concluída" : ""}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={Status.PENDING}>Pendente</SelectItem>
                <SelectItem value={Status.COMPLETED}>Concluída</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="priority">Prioridade</Label>
            <Select value={priority} onValueChange={(value) => setPriority(value as Priority)}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione a prioridade" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={Priority.HIGH}>Alta</SelectItem>
                <SelectItem value={Priority.MEDIUM}>Média</SelectItem>
                <SelectItem value={Priority.LOW}>Baixa</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex gap-2">
            <Button type="submit" className="flex-1">
              {task ? "Atualizar" : "Adicionar"} Tarefa
            </Button>
            {task && (
              <Button type="button" variant="outline" onClick={onCancel}>
                Cancelar
              </Button>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
