"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Edit, Trash2 } from "lucide-react"
import { Task, Status, Priority } from "../types/task"

const getPriorityColor = (priority: Priority) => {
  switch (priority) {
    case Priority.HIGH:
      return "bg-red-100 text-red-800 border-red-200"
    case Priority.MEDIUM:
      return "bg-yellow-100 text-yellow-800 border-yellow-200"
    case Priority.LOW:
      return "bg-green-100 text-green-800 border-green-200"
    default:
      return "bg-gray-100 text-gray-800 border-gray-200"
  }
}

const getPriorityIcon = (priority: Priority) => {
  switch (priority) {
    case Priority.HIGH:
      return "🔴"
    case Priority.MEDIUM:
      return "🟡"
    case Priority.LOW:
      return "🟢"
    default:
      return "⚪"
  }
}

const getPriorityLabel = (priority: Priority) => {
  switch (priority) {
    case Priority.HIGH:
      return "Alta"
    case Priority.MEDIUM:
      return "Média"
    case Priority.LOW:
      return "Baixa"
    default:
      return "-"
  }
}

interface TaskItemProps {
  task: Task
  onEdit: (task: Task) => void
  onDelete: (id: number) => void
}

export default function TaskItem({ task, onEdit, onDelete }: TaskItemProps) {
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = async () => {
    setIsDeleting(true)
    setTimeout(() => {
      onDelete(task.id)
      setIsDeleting(false)
    }, 300)
  }

  return (
    <Card className={`transition-all duration-300 ${isDeleting ? "opacity-50 scale-95" : ""}`}>
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h3 className={`font-medium`}>{task.taskName}</h3>
              <Badge>
                {task.status === Status.COMPLETED ? "Concluída" : "Pendente"}
              </Badge>
              <Badge className={`${getPriorityColor(task.priority)} border`}>
                {getPriorityIcon(task.priority)} {getPriorityLabel(task.priority)}
              </Badge>
            </div>
          </div>
          <div className="flex gap-1">
            <Button size="sm" variant="ghost" onClick={() => onEdit(task)} disabled={isDeleting}>
              <Edit className="h-4 w-4" />
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={handleDelete}
              disabled={isDeleting}
              className="text-red-600 hover:text-red-700 hover:bg-red-50"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
