// Dados mock centralizados
export interface Sala {
  id: string
  nome: string
  dataCadastro?: string
}

export interface Solicitante {
  id: string
  nome: string
  email: string
  dataCadastro?: string
}

export interface Reserva {
  id: string
  salaId: string
  solicitanteId: string
  dataReserva: string
  horaInicio: string
  horaFim: string
}

export const MOCK_SALAS: Sala[] = [
  { id: "1", nome: "Sala de Reunião A", dataCadastro: "2024-01-10" },
  { id: "2", nome: "Sala de Reunião B", dataCadastro: "2024-01-12" },
  { id: "3", nome: "Auditório Principal", dataCadastro: "2024-01-15" },
  { id: "4", nome: "Sala de Treinamento", dataCadastro: "2024-01-18" },
  { id: "5", nome: "Sala de Videoconferência", dataCadastro: "2024-01-20" },
  { id: "6", nome: "Sala de Apresentações", dataCadastro: "2024-01-22" },
]

export const MOCK_SOLICITANTES: Solicitante[] = [
  { id: "1", nome: "João Silva", email: "joao@empresa.com", dataCadastro: "2024-01-10" },
  { id: "2", nome: "Maria Santos", email: "maria@empresa.com", dataCadastro: "2024-01-12" },
  { id: "3", nome: "Pedro Oliveira", email: "pedro@empresa.com", dataCadastro: "2024-01-15" },
  { id: "4", nome: "Ana Costa", email: "ana@empresa.com", dataCadastro: "2024-01-18" },
  { id: "5", nome: "Carlos Mendes", email: "carlos@empresa.com", dataCadastro: "2024-01-20" },
  { id: "6", nome: "Lucia Fernandes", email: "lucia@empresa.com", dataCadastro: "2024-01-22" },
]

export const MOCK_RESERVAS: Reserva[] = [
  {
    id: "1",
    salaId: "1",
    solicitanteId: "1",
    dataReserva: new Date().toISOString().split("T")[0], // Data de hoje
    horaInicio: "09:00",
    horaFim: "11:00",
  },
  {
    id: "2",
    salaId: "2",
    solicitanteId: "2",
    dataReserva: new Date().toISOString().split("T")[0], // Data de hoje
    horaInicio: "14:00",
    horaFim: "16:00",
  },
  {
    id: "3",
    salaId: "3",
    solicitanteId: "3",
    dataReserva: new Date().toISOString().split("T")[0], // Data de hoje
    horaInicio: "10:30",
    horaFim: "12:00",
  },
  {
    id: "4",
    salaId: "4",
    solicitanteId: "4",
    dataReserva: new Date().toISOString().split("T")[0], // Data de hoje
    horaInicio: "15:30",
    horaFim: "17:00",
  },
  {
    id: "5",
    salaId: "1",
    solicitanteId: "5",
    dataReserva: new Date().toISOString().split("T")[0], // Data de hoje
    horaInicio: "13:00",
    horaFim: "14:30",
  },
  {
    id: "6",
    salaId: "2",
    solicitanteId: "6",
    dataReserva: new Date().toISOString().split("T")[0], // Data de hoje
    horaInicio: "08:30",
    horaFim: "09:30",
  },
]

// Função para simular delay de API
export const mockDelay = (ms = 800) => new Promise((resolve) => setTimeout(resolve, ms))
