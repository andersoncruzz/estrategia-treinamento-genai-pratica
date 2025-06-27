// Configuração da API
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3002"
const USE_MOCK_DATA = process.env.NEXT_PUBLIC_USE_MOCK_DATA === "true"

export const API_ENDPOINTS = {
  salas: `${API_BASE_URL}/v1/salas`,
  solicitantes: `${API_BASE_URL}/v1/solicitantes`,
  reservas: `${API_BASE_URL}/v1/reservas`,
} as const

export { API_BASE_URL, USE_MOCK_DATA }
