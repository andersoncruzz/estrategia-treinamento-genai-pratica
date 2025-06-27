"use client"

import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, ListTodo } from "lucide-react"
import { Priority, Status, type Task } from "../types/task"
import { AlertTriangle, Minus, ArrowDown } from "lucide-react"

interface TaskStatsProps {
  tasks: Task[]
}

export default function TaskStats({ tasks }: TaskStatsProps) {
  const totalTasks = tasks.length
  const highPriorityTasks = tasks.filter((task) => task.priority === Priority.HIGH).length
  const mediumPriorityTasks = tasks.filter((task) => task.priority === Priority.MEDIUM).length
  const lowPriorityTasks = tasks.filter((task) => task.priority === Priority.LOW).length
  const completedTasks = tasks.filter((task) => task.status == Status.COMPLETED).length
  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0

  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-2">
            <ListTodo className="h-5 w-5 text-blue-600" />
            <div>
              <p className="text-sm text-gray-600">Total</p>
              <p className="text-2xl font-bold">{totalTasks}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-red-600" />
            <div>
              <p className="text-sm text-gray-600">Alta Prioridade</p>
              <p className="text-2xl font-bold text-red-600">{highPriorityTasks}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-2">
            <Minus className="h-5 w-5 text-yellow-600" />
            <div>
              <p className="text-sm text-gray-600">Média Prioridade</p>
              <p className="text-2xl font-bold text-yellow-600">{mediumPriorityTasks}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-2">
            <ArrowDown className="h-5 w-5 text-green-600" />
            <div>
              <p className="text-sm text-gray-600">Baixa Prioridade</p>
              <p className="text-2xl font-bold text-green-600">{lowPriorityTasks}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-blue-600" />
            <div>
              <p className="text-sm text-gray-600">Concluídas</p>
              <p className="text-2xl font-bold text-blue-600">{completedTasks}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
