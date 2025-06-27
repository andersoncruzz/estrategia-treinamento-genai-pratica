import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Building, Users, Calendar, CalendarDays } from "lucide-react"

// Dados mock para demonstração
const salasDisponiveis = [
  { id: "1", nome: "Sala de Reunião A" },
  { id: "2", nome: "Sala de Reunião B" },
  { id: "3", nome: "Auditório Principal" },
  { id: "4", nome: "Sala de Treinamento" },
]

const reservasMock = [
  {
    id: "1",
    salaId: "1",
    solicitante: "João Silva",
    data: "2024-01-15",
    horaInicio: "09:00",
    horaFim: "11:00",
  },
  {
    id: "2",
    salaId: "2",
    solicitante: "Maria Santos",
    data: "2024-01-15",
    horaInicio: "14:00",
    horaFim: "16:00",
  },
  {
    id: "3",
    salaId: "3",
    solicitante: "Pedro Oliveira",
    data: "2024-01-15",
    horaInicio: "10:30",
    horaFim: "12:00",
  },
  {
    id: "4",
    salaId: "4",
    solicitante: "Ana Carolina Ferreira",
    data: "2024-01-15",
    horaInicio: "15:30",
    horaFim: "17:00",
  },
  {
    id: "5",
    salaId: "1",
    solicitante: "Carlos Mendes",
    data: "2024-01-15",
    horaInicio: "13:00",
    horaFim: "14:30",
  },
  {
    id: "6",
    salaId: "2",
    solicitante: "Lucia Fernandes",
    data: "2024-01-15",
    horaInicio: "08:30",
    horaFim: "09:30",
  },
]

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

function getSalaRow(salaId: string) {
  return salasDisponiveis.findIndex((sala) => sala.id === salaId) + 2 // +2 porque linha 1 é o header
}

export default function HomePage() {
  const dataAtual = new Date().toLocaleDateString("pt-BR")

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
              <Button variant="ghost" asChild className="text-white hover:bg-white/10 bg-white/10">
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
      <main className="max-w-7xl mx-auto p-6">
        {/* Calendário de Reservas */}
        <div>
          <h2 className="text-2xl font-bold text-system-dark mb-4">Calendário de Reservas</h2>
          <div className="bg-system-surface rounded-lg shadow-sm border border-system-secondary overflow-hidden">
            <div className="flex">
              {/* Primeira coluna fixa */}
              <div className="flex-shrink-0">
                {/* Header da primeira coluna */}
                <div className="w-[200px] px-4 py-3 text-left font-semibold text-system-dark bg-system-secondary border-b border-r border-system-primary h-[60px] flex items-center">
                  {dataAtual}
                </div>
                {/* Linhas da primeira coluna */}
                <div className="divide-y divide-system-secondary">
                  {salasDisponiveis.map((sala) => (
                    <div
                      key={sala.id}
                      className="w-[200px] px-4 py-3 font-medium text-system-dark border-r border-system-primary flex items-center h-[60px] bg-system-surface hover:bg-system-background transition-colors"
                    >
                      {sala.nome}
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
                      gridTemplateColumns: `repeat(${horarios.length}, 80px)`,
                      gridTemplateRows: `60px repeat(${salasDisponiveis.length}, 60px)`,
                    }}
                  >
                    {/* Headers dos horários */}
                    {horarios.map((horario, index) => (
                      <div
                        key={horario}
                        className="px-2 py-3 text-center font-semibold text-system-dark bg-system-secondary border-b border-r border-system-primary flex items-center justify-center text-xs"
                        style={{ gridColumn: index + 1, gridRow: 1 }}
                      >
                        {horario}
                      </div>
                    ))}

                    {/* Células do grid - apenas as bordas verticais */}
                    {salasDisponiveis.map((sala, salaIndex) =>
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
                    {reservasMock.map((reserva) => {
                      const startCol = getGridColumn(reserva.horaInicio)
                      const endCol = getGridColumn(reserva.horaFim)
                      const row = getSalaRow(reserva.salaId)

                      return (
                        <div
                          key={reserva.id}
                          className="bg-system-primary text-white px-2 py-2 rounded-md text-xs font-medium flex items-center justify-center m-1 shadow-sm hover:bg-system-primary/90 transition-colors cursor-pointer"
                          style={{
                            gridColumnStart: startCol,
                            gridColumnEnd: endCol,
                            gridRow: row,
                          }}
                          title={`${reserva.solicitante} - ${reserva.horaInicio} às ${reserva.horaFim}`}
                        >
                          <span className="truncate">{reserva.solicitante}</span>
                        </div>
                      )
                    })}
                  </div>

                  {/* Bordas horizontais para alinhar com a primeira coluna */}
                  <div className="absolute inset-0 pointer-events-none">
                    {salasDisponiveis.map((_, index) => (
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
          </div>
          <div className="mt-2 text-sm text-system-primary flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-system-primary rounded"></div>
              <span>Reservado</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-system-surface border border-system-secondary rounded"></div>
              <span>Disponível</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
