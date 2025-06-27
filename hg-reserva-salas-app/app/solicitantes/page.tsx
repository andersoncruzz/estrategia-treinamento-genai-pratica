"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Plus, Building, Users, Calendar, CalendarDays } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function SolicitantesPage() {
  const [nome, setNome] = useState("")
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Aqui você faria a chamada para a API
      // const response = await fetch('/api/solicitantes', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ nome, email })
      // })

      // Simulando sucesso
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "Solicitante cadastrado com sucesso!",
        description: `${nome} foi cadastrado no sistema.`,
      })

      setNome("")
      setEmail("")
    } catch (error) {
      toast({
        title: "Erro ao cadastrar solicitante",
        description: "Tente novamente mais tarde.",
        variant: "destructive",
      })
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
              <Button variant="ghost" asChild className="text-white hover:bg-white/10 bg-white/10">
                <Link href="/solicitantes">
                  <Users className="w-4 h-4 mr-2" />
                  Solicitantes
                </Link>
              </Button>
              <Button variant="ghost" asChild className="text-white hover:bg-white/10">
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
              Novo Solicitante
            </CardTitle>
            <CardDescription className="text-system-primary">
              Preencha os dados da pessoa que poderá fazer reservas
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="nome" className="text-system-dark">
                  Nome Completo
                </Label>
                <Input
                  id="nome"
                  type="text"
                  placeholder="Ex: João Silva"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  required
                  className="border-system-secondary focus:border-system-primary focus:ring-system-primary"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-system-dark">
                  E-mail
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Ex: joao@empresa.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="border-system-secondary focus:border-system-primary focus:ring-system-primary"
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-system-primary hover:bg-system-primary/90 text-white"
                disabled={isLoading}
              >
                {isLoading ? "Cadastrando..." : "Cadastrar Solicitante"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
