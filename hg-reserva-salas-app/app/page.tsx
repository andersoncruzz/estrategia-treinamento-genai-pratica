"use client"

import { useState, useEffect } from "react"
import { Navigation } from "@/components/navigation"
import { Loader2, CalendarIcon } from "lucide-react"
import { useErrorDialog } from "@/contexts/error-dialog-context"
import { API_ENDPOINTS, USE_MOCK_DATA } from "@/lib/api"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { cn } from "@/lib/utils"
import {
  MOCK_SALAS,
  MOCK_SOLICITANTES,
  MOCK_RESERVAS,
  mockDelay,
  type Sala,
  type Solicitante,
  type Reserva,
} from "@/lib/mock-data"

// Alterar o array de horários para terminar às 17:00
const horarios = [
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
  "16:30",
  "17:00",
]

function getGridColumn(hora: string) {
  const [horaStr, minutoStr] = hora.split(":")
  const horaNum = Number.parseInt(horaStr)
  const minutoNum = Number.parseInt(minutoStr)

  // Calcular posição baseada em intervalos de 30 minutos
  // 8:00 = posição 1, 8:30 = posição 2, 9:00 = posição 3, etc.
  const posicao = (horaNum - 8) * 2 + (minutoNum === 30 ? 1 : 0) + 1
  return posicao
}

function getSalaRow(salaId: string, salas: Sala[]) {
  return salas.findIndex((sala) => sala.id === salaId) + 2 // +2 porque linha 1 é o header
}

export default function HomePage() {
  const [salas, setSalas] = useState<Sala[]>([])
  const [solicitantes, setSolicitantes] = useState<Solicitante[]>([])
  const [reservas, setReservas] = useState<Reserva[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [dataSelecionada, setDataSelecionada] = useState<Date>(new Date())
  const [isCalendarOpen, setIsCalendarOpen] = useState(false)
  const { showError } = useErrorDialog()

  // Função para buscar salas da API ou mock
  const fetchSalas = async () => {
    try {
      if (USE_MOCK_DATA) {
        console.log("🎭 Usando dados mock para salas")
        await mockDelay(400)
        return MOCK_SALAS
      }

      const response = await fetch(API_ENDPOINTS.salas)
      if (!response.ok) {
        throw new Error(`Erro na API de salas: ${response.status}`)
      }

      const data = await response.json()
      console.log("🌐 Salas carregadas da API:", data)
      return data
    } catch (error) {
      console.error("❌ Erro ao buscar salas:", error)
      throw error
    }
  }

  // Função para buscar solicitantes da API ou mock
  const fetchSolicitantes = async () => {
    try {
      if (USE_MOCK_DATA) {
        console.log("🎭 Usando dados mock para solicitantes")
        await mockDelay(300)
        return MOCK_SOLICITANTES
      }

      const response = await fetch(API_ENDPOINTS.solicitantes)
      if (!response.ok) {
        throw new Error(`Erro na API de solicitantes: ${response.status}`)
      }

      const data = await response.json()
      console.log("🌐 Solicitantes carregados da API:", data)
      return data
    } catch (error) {
      console.error("❌ Erro ao buscar solicitantes:", error)
      throw error
    }
  }

  // Função para buscar reservas da API ou mock
  const fetchReservas = async () => {
    try {
      if (USE_MOCK_DATA) {
        console.log("🎭 Usando dados mock para reservas")
        await mockDelay(500)
        return MOCK_RESERVAS
      }

      const response = await fetch(API_ENDPOINTS.reservas)
      if (!response.ok) {
        throw new Error(`Erro na API de reservas: ${response.status}`)
      }

      const data = await response.json()
      console.log("🌐 Reservas carregadas da API:", data)
      return data
    } catch (error) {
      console.error("❌ Erro ao buscar reservas:", error)
      throw error
    }
  }

  // Carregar todos os dados quando o componente montar
  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true)

        // Carregar dados em paralelo para melhor performance
        const [salasData, solicitantesData, reservasData] = await Promise.all([
          fetchSalas(),
          fetchSolicitantes(),
          fetchReservas(),
        ])

        setSalas(salasData)
        setSolicitantes(solicitantesData)
        setReservas(reservasData)

        console.log("📊 Dados carregados:", {
          salas: salasData.length,
          solicitantes: solicitantesData.length,
          reservas: reservasData.length,
        })
      } catch (error) {
        console.error("❌ Erro ao carregar dados do calendário:", error)
        showError(
          "Erro ao Carregar Calendário",
          "Não foi possível carregar os dados do calendário. Verifique sua conexão e tente novamente.",
        )
      } finally {
        setIsLoading(false)
      }
    }

    loadData()
  }, [showError])

  // Função para obter nome do solicitante
  const getNomeSolicitante = (solicitanteId: string) => {
    const solicitante = solicitantes.find((s) => s.id === solicitanteId)
    return solicitante?.nome || "Solicitante não encontrado"
  }

  // Filtrar reservas para a data selecionada
  const dataSelecionadaString = format(dataSelecionada, "yyyy-MM-dd")
  const reservasDataSelecionada = reservas.filter((reserva) => {
    console.log(`🔍 Comparando reserva ${reserva.id}: ${reserva.dataReserva} === ${dataSelecionadaString}`)
    return reserva.dataReserva === dataSelecionadaString
  })

  console.log(`📅 Reservas para ${dataSelecionadaString}:`, reservasDataSelecionada)

  return (
    <div className="min-h-screen bg-system-background">
      {/* Navegação Responsiva */}
      <Navigation />

      {/* Conteúdo Principal */}
      <main className="max-w-7xl mx-auto p-4 sm:p-6">
        {/* Calendário de Reservas */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-system-dark">Calendário de Reservas</h2>
            {USE_MOCK_DATA && (
              <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium">
                Modo Demonstração
              </span>
            )}
          </div>

          <div className="bg-system-surface rounded-lg shadow-sm border border-system-secondary overflow-hidden">
            {isLoading ? (
              <div className="flex items-center justify-center py-16">
                <Loader2 className="w-8 h-8 animate-spin text-system-primary mr-3" />
                <div className="text-center">
                  <p className="text-system-primary font-medium">Carregando calendário...</p>
                  <p className="text-sm text-system-secondary mt-1">Buscando salas, solicitantes e reservas</p>
                </div>
              </div>
            ) : salas.length === 0 ? (
              <div className="text-center py-16 text-system-primary">
                <div className="w-16 h-16 mx-auto mb-4 bg-system-secondary rounded-full flex items-center justify-center">
                  <span className="text-2xl">📅</span>
                </div>
                <p className="text-lg font-medium">Nenhuma sala cadastrada</p>
                <p className="text-sm text-system-secondary mt-1">
                  Cadastre salas para visualizar o calendário de reservas
                </p>
              </div>
            ) : (
              <div className="flex">
                {/* Primeira coluna fixa */}
                <div className="flex-shrink-0">
                  {/* Header da primeira coluna com DatePicker */}
                  <div className="w-[150px] sm:w-[200px] px-2 sm:px-4 py-3 text-left font-semibold text-system-dark bg-system-secondary border-b border-r border-system-primary h-[60px] flex items-center text-sm sm:text-base">
                    <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
                      <PopoverTrigger asChild>
                        <Button
                          variant="ghost"
                          className={cn(
                            "w-full justify-start text-left font-semibold p-0 h-auto hover:bg-transparent text-system-dark",
                            !dataSelecionada && "text-muted-foreground",
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          <span className="truncate">
                            {dataSelecionada ? format(dataSelecionada, "dd/MM/yyyy", { locale: ptBR }) : "Selecionar"}
                          </span>
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={dataSelecionada}
                          onSelect={(date) => {
                            if (date) {
                              setDataSelecionada(date)
                              setIsCalendarOpen(false)
                            }
                          }}
                          disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
                          initialFocus
                          locale={ptBR}
                          className="rounded-md border"
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  {/* Linhas da primeira coluna */}
                  <div className="divide-y divide-system-secondary">
                    {salas.map((sala) => (
                      <div
                        key={sala.id}
                        className="w-[150px] sm:w-[200px] px-2 sm:px-4 py-3 font-medium text-system-dark border-r border-system-primary flex items-center h-[60px] bg-system-surface hover:bg-system-background transition-colors text-sm sm:text-base"
                      >
                        <span className="truncate">{sala.nome}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Grid de horários com scroll */}
                <div className="flex-1 overflow-x-auto">
                  <div className="min-w-max relative">
                    {/* Grid Container */}
                    <div
                      className="grid gap-0 border-l border-system-secondary"
                      style={{
                        gridTemplateColumns: `repeat(${horarios.length}, 60px)`,
                        gridTemplateRows: `60px repeat(${salas.length}, 60px)`,
                      }}
                    >
                      {/* Headers dos horários */}
                      {horarios.map((horario, index) => (
                        <div
                          key={horario}
                          className="px-1 sm:px-2 py-3 text-center font-semibold text-system-dark bg-system-secondary border-b border-r border-system-primary flex items-center justify-center text-xs"
                          style={{ gridColumn: index + 1, gridRow: 1 }}
                        >
                          {horario}
                        </div>
                      ))}

                      {/* Células do grid - apenas as bordas verticais */}
                      {salas.map((sala, salaIndex) =>
                        horarios.map((horario, horarioIndex) => (
                          <div
                            key={`${sala.id}-${horario}`}
                            className="border-r border-system-secondary bg-system-surface hover:bg-system-background transition-colors"
                            style={{
                              gridColumn: horarioIndex + 1,
                              gridRow: salaIndex + 2,
                            }}
                          />
                        )),
                      )}

                      {/* Reservas */}
                      {reservasDataSelecionada.map((reserva) => {
                        const startCol = getGridColumn(reserva.horaInicio)
                        const endCol = getGridColumn(reserva.horaFim)
                        const row = getSalaRow(reserva.salaId, salas)

                        console.log(`🎯 Renderizando reserva ${reserva.id}:`, {
                          salaId: reserva.salaId,
                          horaInicio: reserva.horaInicio,
                          horaFim: reserva.horaFim,
                          startCol,
                          endCol,
                          row,
                          salaEncontrada: salas.find((s) => s.id === reserva.salaId)?.nome,
                        })

                        // Se a sala não foi encontrada, não renderizar a reserva
                        if (row === 1) {
                          console.log(`⚠️ Sala não encontrada para reserva ${reserva.id}`)
                          return null
                        }

                        const nomeCompleto = getNomeSolicitante(reserva.solicitanteId)
                        const primeiroNome = nomeCompleto.split(" ")[0]

                        return (
                          <div
                            key={reserva.id}
                            className="bg-system-primary text-white px-1 sm:px-2 py-2 rounded-md text-xs font-medium flex items-center justify-center m-1 shadow-sm hover:bg-system-primary/90 transition-colors cursor-pointer z-10"
                            style={{
                              gridColumnStart: startCol,
                              gridColumnEnd: endCol,
                              gridRow: row,
                            }}
                            title={`${nomeCompleto} - ${reserva.horaInicio} às ${reserva.horaFim}`}
                          >
                            <span className="truncate text-center leading-tight">{primeiroNome}</span>
                          </div>
                        )
                      })}
                    </div>

                    {/* Bordas horizontais para alinhar com a primeira coluna */}
                    <div className="absolute inset-0 pointer-events-none">
                      {salas.map((_, index) => (
                        <div
                          key={index}
                          className="border-b border-system-secondary"
                          style={{
                            position: "absolute",
                            top: `${60 + (index + 1) * 60}px`,
                            left: 0,
                            right: 0,
                            height: "1px",
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {!isLoading && salas.length > 0 && (
            <div className="mt-4 flex flex-wrap items-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-system-primary rounded"></div>
                <span className="text-system-primary">Reservado</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-system-surface border border-system-secondary rounded"></div>
                <span className="text-system-primary">Disponível</span>
              </div>
              <div className="text-system-secondary">
                Mostrando reservas para {format(dataSelecionada, "dd/MM/yyyy", { locale: ptBR })}
              </div>
              {reservasDataSelecionada.length > 0 && (
                <div className="text-system-primary font-medium">
                  {reservasDataSelecionada.length} reserva{reservasDataSelecionada.length !== 1 ? "s" : ""} neste dia
                </div>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
