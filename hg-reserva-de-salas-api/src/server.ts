import fastify from 'fastify';
import { PrismaClient } from '@prisma/client';

const app = fastify({ logger: true });
const prisma = new PrismaClient();

// Plugin de rotas v1
app.register(async (api, opts) => {
  // CRUD de Salas
  api.post('/salas', async (request, reply) => {
    const { nome } = request.body as { nome: string };
    try {
      const sala = await prisma.sala.create({ data: { nome } });
      return sala;
    } catch {
      return reply.code(500).send({ error: 'Erro ao criar sala' });
    }
  });

  api.get('/salas', async () => {
    return prisma.sala.findMany();
  });

  api.get('/salas/:id', async (request, reply) => {
    const id = Number((request.params as any).id);
    const sala = await prisma.sala.findUnique({ where: { id } });
    if (!sala) return reply.code(404).send({ error: 'Sala não encontrada' });
    return sala;
  });

  // CRUD de Solicitantes
  api.post('/solicitantes', async (request, reply) => {
    const { nome, email } = request.body as { nome: string; email: string };
    try {
      const solicitante = await prisma.solicitante.create({ data: { nome, email } });
      return solicitante;
    } catch {
      return reply.code(500).send({ error: 'Erro ao criar solicitante' });
    }
  });

  api.get('/solicitantes', async () => {
    return prisma.solicitante.findMany();
  });

  api.get('/solicitantes/:id', async (request, reply) => {
    const id = Number((request.params as any).id);
    const solicitante = await prisma.solicitante.findUnique({ where: { id } });
    if (!solicitante) return reply.code(404).send({ error: 'Solicitante não encontrado' });
    return solicitante;
  });

  // CRUD de Reservas
  api.post('/reservas', async (request, reply) => {
    const { salaId, solicitanteId, data, horaInicio, horaFim } = request.body as { salaId: number, solicitanteId: number, data: string, horaInicio: string, horaFim: string };
    try {
      const conflito = await prisma.reserva.findFirst({
        where: {
          salaId,
          data,
          OR: [
            { AND: [{ horaInicio: { lte: horaInicio } }, { horaFim: { gt: horaInicio } }] },
            { AND: [{ horaInicio: { lt: horaFim } }, { horaFim: { gte: horaFim } }] },
            { AND: [{ horaInicio: { gte: horaInicio } }, { horaFim: { lte: horaFim } }] },
          ],
        },
      });
      if (conflito) return reply.code(400).send({ error: 'Conflito de horário' });
      const reserva = await prisma.reserva.create({ data: { salaId, solicitanteId, data, horaInicio, horaFim } });
      return reserva;
    } catch {
      return reply.code(500).send({ error: 'Erro ao criar reserva' });
    }
  });

  api.get('/reservas', async () => {
    return prisma.reserva.findMany();
  });

  api.get('/reservas/:id', async (request, reply) => {
    const id = Number((request.params as any).id);
    const reserva = await prisma.reserva.findUnique({ where: { id } });
    if (!reserva) return reply.code(404).send({ error: 'Reserva não encontrada' });
    return reserva;
  });
}, { prefix: '/v1' });

const start = async () => {
  try {
    await app.listen({ port: 3000, host: '0.0.0.0' });
    console.log('Servidor rodando em http://localhost:3000');
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};
start();

export {};
