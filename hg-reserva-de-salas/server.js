// server.js
const fastify = require('fastify')({ logger: true })

// Dados em memória
let salas = []
let reservas = []
let salaId = 1
let reservaId = 1

// CRUD de Salas
fastify.post('/salas', async (request, reply) => {
  const { nome } = request.body
  const sala = { id: salaId++, nome }
  salas.push(sala)
  return sala
})

fastify.get('/salas', async () => salas)

fastify.get('/salas/:id', async (request, reply) => {
  const sala = salas.find(s => s.id === Number(request.params.id))
  if (!sala) return reply.code(404).send({ error: 'Sala não encontrada' })
  return sala
})

// CRUD de Reservas
fastify.post('/reservas', async (request, reply) => {
  const { salaId, data, horaInicio, horaFim } = request.body
  // Validação de conflito
  const conflito = reservas.some(r =>
    r.salaId === salaId && r.data === data &&
    ((horaInicio >= r.horaInicio && horaInicio < r.horaFim) ||
     (horaFim > r.horaInicio && horaFim <= r.horaFim) ||
     (horaInicio <= r.horaInicio && horaFim >= r.horaFim))
  )
  if (conflito) return reply.code(400).send({ error: 'Conflito de horário' })
  const reserva = { id: reservaId++, salaId, data, horaInicio, horaFim }
  reservas.push(reserva)
  return reserva
})

fastify.get('/reservas', async () => reservas)

fastify.get('/reservas/:id', async (request, reply) => {
  const reserva = reservas.find(r => r.id === Number(request.params.id))
  if (!reserva) return reply.code(404).send({ error: 'Reserva não encontrada' })
  return reserva
})

// Inicialização
const start = async () => {
  try {
    await fastify.listen({ port: 3000, host: '0.0.0.0' })
    console.log('Servidor rodando em http://localhost:3000')
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
start()
