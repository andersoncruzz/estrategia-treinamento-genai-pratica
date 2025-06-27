"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Calendar, Plus, Loader2, Clock, User, MapPin } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useErrorDialog } from "@/contexts/error-dialog-context"
import { API_ENDPOINTS, USE_MOCK_DATA } from "@/lib/api"
import {
  MOCK_SALAS,
  MOCK_SOLICITANTES,
  MOCK_RESERVAS,
  mockDelay,
  type Sala,
  type Solicitante,
  type Reserva,
} from "@/lib/mock-data"
import { Navigation } from "@/components/navigation"

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

// Horários para fim da reserva
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

  // Estados para os dados das APIs
  const [salas, setSalas] = useState<Sala[]>([])
  const [solicitantes, setSolicitantes] = useState<Solicitante[]>([])
  const [reservas, setReservas] = useState<Reserva[]>([])
  const [isLoadingSalas, setIsLoadingSalas] = useState(true)
  const [isLoadingSolicitantes, setIsLoadingSolicitantes] = useState(true)
  const [isLoadingReservas, setIsLoadingReservas] = useState(true)
  const [hasErrorSalas, setHasErrorSalas] = useState(false)
  const [hasErrorSolicitantes, setHasErrorSolicitantes] = useState(false)
  const [hasErrorReservas, setHasErrorReservas] = useState(false)

  const { toast } = useToast()
  const { showError } = useErrorDialog()

  // Função para buscar salas da API ou mock
  const fetchSalas = async () => {
    try {
      setIsLoadingSalas(true)
      setHasErrorSalas(false)

      if (USE_MOCK_DATA) {
        console.log("🎭 Usando dados mock para salas")
        await mockDelay()
        setSalas(MOCK_SALAS)
        return
      }

      const response = await fetch(API_ENDPOINTS.salas)

      if (!response.ok) {
        throw new Error(`Erro na API de salas: ${response.status}`)
      }

      const data = await response.json()
      console.log("🌐 Salas carregadas da API:", data)
      setSalas(Array.isArray(data) ? data : [])
    } catch (error) {
      console.error("❌ Erro ao buscar salas:", error)
      setHasErrorSalas(true)
      showError("Erro ao Carregar Salas", "Não foi possível carregar a lista de salas.")
    } finally {
      setIsLoadingSalas(false)
    }
  }

  // Função para buscar solicitantes da API ou mock
  const fetchSolicitantes = async () => {
    try {
      setIsLoadingSolicitantes(true)
      setHasErrorSolicitantes(false)

      if (USE_MOCK_DATA) {
        console.log("🎭 Usando dados mock para solicitantes")
        await mockDelay()
        setSolicitantes(MOCK_SOLICITANTES)
        return
      }

      const response = await fetch(API_ENDPOINTS.solicitantes)

      if (!response.ok) {
        throw new Error(`Erro na API de solicitantes: ${response.status}`)
      }

      const data = await response.json()
      console.log("🌐 Solicitantes carregados da API:", data)
      setSolicitantes(Array.isArray(data) ? data : [])
    } catch (error) {
      console.error("❌ Erro ao buscar solicitantes:", error)
      setHasErrorSolicitantes(true)
      showError("Erro ao Carregar Solicitantes", "Não foi possível carregar a lista de solicitantes.")
    } finally {
      setIsLoadingSolicitantes(false)
    }
  }

  // Função para buscar reservas da API ou mock
  const fetchReservas = async () => {
    try {
      setIsLoadingReservas(true)
      setHasErrorReservas(false)

      if (USE_MOCK_DATA) {
        console.log("🎭 Usando dados mock para reservas")
        await mockDelay()
        setReservas(MOCK_RESERVAS)
        return
      }

      const response = await fetch(API_ENDPOINTS.reservas)

      if (!response.ok) {
        throw new Error(`Erro na API de reservas: ${response.status}`)
      }

      const data = await response.json()
      console.log("🌐 Reservas carregadas da API:", data)
      setReservas(Array.isArray(data) ? data : [])
    } catch (error) {
      console.error("❌ Erro ao buscar reservas:", error)
      setHasErrorReservas(true)
      showError("Erro ao Carregar Reservas", "Não foi possível carregar a lista de reservas.")
    } finally {
      setIsLoadingReservas(false)
    }
  }

  // Carregar dados quando o componente montar
  useEffect(() => {
    fetchSalas()
    fetchSolicitantes()
    fetchReservas()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Validação básica
      if (!salaId || !solicitanteId || !dataReserva || !horaInicio || !horaFim) {
        showError("Campos Obrigatórios", "Por favor, preencha todos os campos antes de continuar.")
        setIsLoading(false)
        return
      }

      if (horaInicio >= horaFim) {
        showError(
          "Erro na Reserva",
          "A hora de início deve ser anterior à hora de fim. Por favor, verifique os horários selecionados e tente novamente.",
        )
        setIsLoading(false)
        return
      }

      const sala = salas.find((s) => s.id === salaId)
      const solicitante = solicitantes.find((s) => s.id === solicitanteId)

      if (USE_MOCK_DATA) {
        console.log("🎭 Simulando criação de reserva:", {
          salaId,
          solicitanteId,
          dataReserva,
          horaInicio,
          horaFim,
        })
        await mockDelay()

        toast({
          title: "Reserva realizada com sucesso!",
          description: `${sala?.nome} reservada para ${solicitante?.nome} em ${new Date(dataReserva).toLocaleDateString("pt-BR")} (modo demonstração).`,
        })
      } else {
        const response = await fetch(API_ENDPOINTS.reservas, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            salaId,
            solicitanteId,
            dataReserva,
            horaInicio,
            horaFim,
          }),
        })

        if (!response.ok) {
          throw new Error(`Erro na API: ${response.status}`)
        }

        toast({
          title: "Reserva realizada com sucesso!",
          description: `${sala?.nome} reservada para ${solicitante?.nome} em ${new Date(dataReserva).toLocaleDateString("pt-BR")}.`,
        })
      }

      // Limpar formulário
      setSalaId("")
      setSolicitanteId("")
      setDataReserva("")
      setHoraInicio("")
      setHoraFim("")

      // Recarregar a lista de reservas
      fetchReservas()
    } catch (error) {
      console.error("❌ Erro ao fazer reserva:", error)
      showError("Erro ao Fazer Reserva", "Não foi possível processar sua reserva no momento. Verifique sua conexão.")
    } finally {
      setIsLoading(false)
    }
  }

  const formatarData = (data: string) => {
    return new Date(data).toLocaleDateString("pt-BR")
  }

  const getNomeSala = (salaId: string) => {
    const sala = salas.find((s) => s.id === salaId)
    return sala?.nome || "Sala não encontrada"
  }

  const getNomeSolicitante = (solicitanteId: string) => {
    const solicitante = solicitantes.find((s) => s.id === solicitanteId)
    return solicitante?.nome || "Solicitante não encontrado"
  }

  return (
    <div className="min-h-screen bg-system-background">
      {/* Navegação Responsiva */}
      <Navigation />

      {/* Conteúdo Principal */}
      <main className="max-w-7xl mx-auto p-4 sm:p-6">
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 sm:gap-6">
          {/* Formulário de Nova Reserva */}
          <div className="xl:col-span-1">
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
                    <Label htmlFor="salaId" className="text-system-dark">
                      Sala
                    </Label>
                    {/* O componente Radix Select não gera um <select> nativo, mas sim um <button>.
                        Para acessibilidade, mantenha o id no SelectTrigger e o htmlFor no Label.
                        Se for necessário um <select> nativo para integração com navegadores/autofill,
                        troque o componente por um <select> HTML padrão, assim: */}
                    {/* 
                    <select
                      id="salaId"
                      value={salaId}
                      onChange={e => setSalaId(e.target.value)}
                      disabled={isLoadingSalas || hasErrorSalas}
                      className="border-system-secondary focus:border-system-primary focus:ring-system-primary w-full h-10 rounded-md px-3 py-2"
                    >
                      <option value="" disabled>
                        {isLoadingSalas
                          ? "Carregando salas..."
                          : hasErrorSalas
                          ? "Erro ao carregar salas"
                          : salas.length === 0
                          ? "Nenhuma sala disponível"
                          : "Selecione uma sala"}
                      </option>
                      {salas.map((sala) => (
                        <option key={sala.id} value={sala.id}>
                          {sala.nome}
                        </option>
                      ))}
                    </select>
                    */}
                    {/* Se quiser manter o Radix Select, mantenha como está abaixo: */}
                    <Select
                      value={salaId}
                      onValueChange={setSalaId}
                      disabled={isLoadingSalas || hasErrorSalas}
                    >
                      <SelectTrigger
                        id="salaId"
                        className="border-system-secondary focus:border-system-primary focus:ring-system-primary"
                      >
                        <SelectValue
                          placeholder={
                            isLoadingSalas ? (
                              <div className="flex items-center">
                                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                Carregando salas...
                              </div>
                            ) : hasErrorSalas ? (
                              "Erro ao carregar salas"
                            ) : salas.length === 0 ? (
                              "Nenhuma sala disponível"
                            ) : (
                              "Selecione uma sala"
                            )
                          }
                        />
                      </SelectTrigger>
                      <SelectContent>
                        {salas.map((sala) => (
                          <SelectItem key={sala.id} value={sala.id}>
                            {sala.nome}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="solicitanteId" className="text-system-dark">
                      Solicitante
                    </Label>
                    <Select
                      value={solicitanteId}
                      onValueChange={setSolicitanteId}
                      disabled={isLoadingSolicitantes || hasErrorSolicitantes}
                    >
                      <SelectTrigger
                        id="solicitanteId"
                        className="border-system-secondary focus:border-system-primary focus:ring-system-primary"
                      >
                        <SelectValue
                          placeholder={
                            isLoadingSolicitantes ? (
                              <div className="flex items-center">
                                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                Carregando solicitantes...
                              </div>
                            ) : hasErrorSolicitantes ? (
                              "Erro ao carregar solicitantes"
                            ) : solicitantes.length === 0 ? (
                              "Nenhum solicitante disponível"
                            ) : (
                              "Selecione um solicitante"
                            )
                          }
                        />
                      </SelectTrigger>
                      <SelectContent>
                        {solicitantes.map((solicitante) => (
                          <SelectItem key={solicitante.id} value={solicitante.id}>
                            {solicitante.nome} ({solicitante.email})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="dataReserva" className="text-system-dark">
                      Data da Reserva
                    </Label>
                    <Input
                      id="dataReserva"
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
                      <Select value={horaInicio} onValueChange={setHoraInicio}>
                        <SelectTrigger
                          id="horaInicio"
                          className="border-system-secondary focus:border-system-primary focus:ring-system-primary"
                        >
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
                      <Select value={horaFim} onValueChange={setHoraFim}>
                        <SelectTrigger
                          id="horaFim"
                          className="border-system-secondary focus:border-system-primary focus:ring-system-primary"
                        >
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
                    disabled={
                      isLoading || isLoadingSalas || isLoadingSolicitantes || hasErrorSalas || hasErrorSolicitantes
                    }
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Fazendo Reserva...
                      </>
                    ) : (
                      "Fazer Reserva"
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Lista de Reservas */}
          <div className="xl:col-span-2">
            <Card className="border-system-secondary bg-system-surface">
              <CardHeader>
                <CardTitle className="flex items-center text-system-dark">
                  <Calendar className="w-5 h-5 mr-2" />
                  Reservas Cadastradas
                </CardTitle>
                <CardDescription className="text-system-primary">Lista de todas as reservas realizadas</CardDescription>
              </CardHeader>
              <CardContent>
                {isLoadingReservas ? (
                  <div className="flex items-center justify-center py-8">
                    <Loader2 className="w-6 h-6 animate-spin text-system-primary" />
                    <span className="ml-2 text-system-primary">Carregando reservas...</span>
                  </div>
                ) : hasErrorReservas ? (
                  <div className="text-center py-8 text-red-600">
                    <Calendar className="w-12 h-12 mx-auto mb-4 text-red-400" />
                    <p>Erro ao carregar reservas.</p>
                    <p className="text-sm text-red-500 mt-1">Verifique sua conexão e tente novamente.</p>
                    <Button
                      onClick={fetchReservas}
                      variant="outline"
                      className="mt-4 border-red-300 text-red-600 hover:bg-red-50 bg-transparent"
                    >
                      Tentar Novamente
                    </Button>
                  </div>
                ) : reservas.length === 0 ? (
                  <div className="text-center py-8 text-system-primary">
                    <Calendar className="w-12 h-12 mx-auto mb-4 text-system-secondary" />
                    <p>Nenhuma reserva cadastrada ainda.</p>
                    <p className="text-sm text-system-secondary mt-1">
                      Faça a primeira reserva usando o formulário ao lado.
                    </p>
                  </div>
                ) : (
                  <div className="overflow-hidden rounded-lg border border-system-secondary">
                    <Table>
                      <TableHeader>
                        <TableRow className="bg-system-secondary/50">
                          <TableHead className="text-system-dark font-semibold">Sala</TableHead>
                          <TableHead className="text-system-dark font-semibold">Solicitante</TableHead>
                          <TableHead className="text-system-dark font-semibold">Data</TableHead>
                          <TableHead className="text-system-dark font-semibold">Horário</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {reservas.map((reserva) => (
                          <TableRow key={reserva.id} className="hover:bg-system-background">
                            <TableCell className="font-medium text-system-dark">
                              <div className="flex items-center">
                                <MapPin className="w-4 h-4 mr-2 text-system-primary" />
                                {getNomeSala(reserva.salaId)}
                              </div>
                            </TableCell>
                            <TableCell className="text-system-primary">
                              <div className="flex items-center">
                                <User className="w-4 h-4 mr-2 text-system-secondary" />
                                {getNomeSolicitante(reserva.solicitanteId)}
                              </div>
                            </TableCell>
                            <TableCell className="text-system-secondary">{formatarData(reserva.dataReserva)}</TableCell>
                            <TableCell className="text-system-secondary">
                              <div className="flex items-center">
                                <Clock className="w-4 h-4 mr-2 text-system-primary" />
                                {reserva.horaInicio} - {reserva.horaFim}
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
