"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, Plus, Building, Users, CalendarDays } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useErrorDialog } from "@/contexts/error-dialog-context"

// Dados mock - em produção viriam das APIs
const salasDisponiveis = [
  { id: "1", nome: "Sala de Reunião A" },
  { id: "2", nome: "Sala de Reunião B" },
  { id: "3", nome: "Auditório Principal" },
  { id: "4", nome: "Sala de Treinamento" },
]

const solicitantesDisponiveis = [
  { id: "1", nome: "João Silva", email: "joao@empresa.com" },
  { id: "2", nome: "Maria Santos", email: "maria@empresa.com" },
  { id: "3", nome: "Pedro Oliveira", email: "pedro@empresa.com" },
  { id: "4", nome: "Ana Costa", email: "ana@empresa.com" },
]

// Horários disponíveis em intervalos de 30 minutos
const horariosDisponiveis = [
  "08:00",
  "08:30",
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "12:00",
  "12:30",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
]

// Adicionar um novo array de horários para o campo hora de fim
const horariosFimDisponiveis = [
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "12:00",
  "12:30",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
]

export default function ReservasPage() {
  const [salaId, setSalaId] = useState("")
  const [solicitanteId, setSolicitanteId] = useState("")
  const [dataReserva, setDataReserva] = useState("")
  const [horaInicio, setHoraInicio] = useState("")
  const [horaFim, setHoraFim] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()
  const { showError } = useErrorDialog()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Validação básica
      if (horaInicio >= horaFim) {
        showError(
          "Erro na Reserva",
          "A hora de início deve ser anterior à hora de fim. Por favor, verifique os horários selecionados e tente novamente.",
        )
        setIsLoading(false)
        return
      }

      // Simulando um erro de API para demonstrar o dialog
      const shouldSimulateError = Math.random() > 0.7 // 30% de chance de erro

      if (shouldSimulateError) {
        throw new Error("Erro de conexão com o servidor")
      }

      // Aqui você faria a chamada para a API
      // const response = await fetch('/api/reservas', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({
      //     salaId,
      //     solicitanteId,
      //     dataReserva,
      //     horaInicio,
      //     horaFim
      //   })
      // })

      // Simulando sucesso
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const sala = salasDisponiveis.find((s) => s.id === salaId)
      const solicitante = solicitantesDisponiveis.find((s) => s.id === solicitanteId)

      toast({
        title: "Reserva realizada com sucesso!",
        description: `${sala?.nome} reservada para ${solicitante?.nome} em ${dataReserva}.`,
      })

      // Limpar formulário
      setSalaId("")
      setSolicitanteId("")
      setDataReserva("")
      setHoraInicio("")
      setHoraFim("")
    } catch (error) {
      showError(
        "Erro ao Fazer Reserva",
        "Não foi possível processar sua reserva no momento. Verifique sua conexão com a internet e tente novamente. Se o problema persistir, entre em contato com o suporte técnico.",
      )
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-system-background">
      {/* Barra de Título */}
      <header className="bg-system-primary shadow-sm border-b border-system-secondary">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-white">Sistema de Reserva de Salas</h1>
              <p className="text-system-secondary/80 text-sm mt-1">Gerencie salas, solicitantes e reservas</p>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" asChild className="text-white hover:bg-white/10">
                <Link href="/">
                  <CalendarDays className="w-4 h-4 mr-2" />
                  Calendário
                </Link>
              </Button>
              <Button variant="ghost" asChild className="text-white hover:bg-white/10">
                <Link href="/salas">
                  <Building className="w-4 h-4 mr-2" />
                  Salas
                </Link>
              </Button>
              <Button variant="ghost" asChild className="text-white hover:bg-white/10">
                <Link href="/solicitantes">
                  <Users className="w-4 h-4 mr-2" />
                  Solicitantes
                </Link>
              </Button>
              <Button variant="ghost" asChild className="text-white hover:bg-white/10 bg-white/10">
                <Link href="/reservas">
                  <Calendar className="w-4 h-4 mr-2" />
                  Reservas
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Conteúdo Principal */}
      <main className="max-w-2xl mx-auto p-6">
        <Card className="border-system-secondary bg-system-surface">
          <CardHeader>
            <CardTitle className="flex items-center text-system-dark">
              <Plus className="w-5 h-5 mr-2" />
              Nova Reserva
            </CardTitle>
            <CardDescription className="text-system-primary">
              Preencha todos os dados para fazer a reserva
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="sala" className="text-system-dark">
                  Sala
                </Label>
                <Select value={salaId} onValueChange={setSalaId} required>
                  <SelectTrigger className="border-system-secondary focus:border-system-primary focus:ring-system-primary">
                    <SelectValue placeholder="Selecione uma sala" />
                  </SelectTrigger>
                  <SelectContent>
                    {salasDisponiveis.map((sala) => (
                      <SelectItem key={sala.id} value={sala.id}>
                        {sala.nome}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="solicitante" className="text-system-dark">
                  Solicitante
                </Label>
                <Select value={solicitanteId} onValueChange={setSolicitanteId} required>
                  <SelectTrigger className="border-system-secondary focus:border-system-primary focus:ring-system-primary">
                    <SelectValue placeholder="Selecione um solicitante" />
                  </SelectTrigger>
                  <SelectContent>
                    {solicitantesDisponiveis.map((solicitante) => (
                      <SelectItem key={solicitante.id} value={solicitante.id}>
                        {solicitante.nome} ({solicitante.email})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="data" className="text-system-dark">
                  Data da Reserva
                </Label>
                <Input
                  id="data"
                  type="date"
                  value={dataReserva}
                  onChange={(e) => setDataReserva(e.target.value)}
                  min={new Date().toISOString().split("T")[0]}
                  required
                  className="border-system-secondary focus:border-system-primary focus:ring-system-primary"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="horaInicio" className="text-system-dark">
                    Hora de Início
                  </Label>
                  <Select value={horaInicio} onValueChange={setHoraInicio} required>
                    <SelectTrigger className="border-system-secondary focus:border-system-primary focus:ring-system-primary">
                      <SelectValue placeholder="Selecione o horário" />
                    </SelectTrigger>
                    <SelectContent>
                      {horariosDisponiveis.map((horario) => (
                        <SelectItem key={horario} value={horario}>
                          {horario}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="horaFim" className="text-system-dark">
                    Hora de Fim
                  </Label>
                  <Select value={horaFim} onValueChange={setHoraFim} required>
                    <SelectTrigger className="border-system-secondary focus:border-system-primary focus:ring-system-primary">
                      <SelectValue placeholder="Selecione o horário" />
                    </SelectTrigger>
                    <SelectContent>
                      {horariosFimDisponiveis.map((horario) => (
                        <SelectItem key={horario} value={horario}>
                          {horario}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-system-primary hover:bg-system-primary/90 text-white"
                disabled={isLoading}
              >
                {isLoading ? "Fazendo Reserva..." : "Fazer Reserva"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
