import fastify from 'fastify';
import { PrismaClient } from '@prisma/client';
import swagger from '@fastify/swagger';
import swaggerUI from '@fastify/swagger-ui';
import cors from '@fastify/cors';

const app = fastify({ logger: true });
const prisma = new PrismaClient();

// Habilita CORS para todas as origens
await app.register(cors, {
  origin: true
});

// Swagger setup
await app.register(swagger, {
  openapi: {
    info: {
      title: 'Reserva de Salas API',
      description: 'API para agendamento e gerenciamento de reservas de salas',
      version: '1.0.0',
    },
  },
});
await app.register(swaggerUI, {
  routePrefix: '/docs',
});

// Plugin de rotas v1
app.register(async (api, opts) => {
  // CRUD de Salas
  api.post('/salas', {
    schema: {
      body: {
        type: 'object',
        required: ['nome'],
        properties: {
          nome: { type: 'string' }
        }
      },
      response: {
        200: {
          type: 'object',
          properties: {
            id: { type: 'number' },
            nome: { type: 'string' }
          }
        }
      },
      description: 'Cria uma nova sala'
    }
  }, async (request, reply) => {
    const { nome } = request.body as { nome: string };
    try {
      const sala = await prisma.sala.create({ data: { nome } });
      return sala;
    } catch {
      return reply.code(500).send({ error: 'Erro ao criar sala' });
    }
  });

  api.get('/salas', {
    schema: {
      response: {
        200: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              id: { type: 'number' },
              nome: { type: 'string' }
            }
          }
        }
      },
      description: 'Lista todas as salas'
    }
  }, async () => {
    return prisma.sala.findMany();
  });

  api.get('/salas/:id', {
    schema: {
      params: {
        type: 'object',
        properties: {
          id: { type: 'number' }
        }
      },
      response: {
        200: {
          type: 'object',
          properties: {
            id: { type: 'number' },
            nome: { type: 'string' }
          }
        },
        404: {
          type: 'object',
          properties: {
            error: { type: 'string' }
          }
        }
      },
      description: 'Busca sala por id'
    }
  }, async (request, reply) => {
    const id = Number((request.params as any).id);
    const sala = await prisma.sala.findUnique({ where: { id } });
    if (!sala) return reply.code(404).send({ error: 'Sala não encontrada' });
    return sala;
  });

  // CRUD de Solicitantes
  api.post('/solicitantes', {
    schema: {
      body: {
        type: 'object',
        required: ['nome', 'email'],
        properties: {
          nome: { type: 'string' },
          email: { type: 'string' }
        }
      },
      response: {
        200: {
          type: 'object',
          properties: {
            id: { type: 'number' },
            nome: { type: 'string' },
            email: { type: 'string' }
          }
        }
      },
      description: 'Cria um novo solicitante'
    }
  }, async (request, reply) => {
    const { nome, email } = request.body as { nome: string; email: string };
    try {
      const solicitante = await prisma.solicitante.create({ data: { nome, email } });
      return solicitante;
    } catch {
      return reply.code(500).send({ error: 'Erro ao criar solicitante' });
    }
  });

  api.get('/solicitantes', {
    schema: {
      response: {
        200: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              id: { type: 'number' },
              nome: { type: 'string' },
              email: { type: 'string' }
            }
          }
        }
      },
      description: 'Lista todos os solicitantes'
    }
  }, async () => {
    return prisma.solicitante.findMany();
  });

  api.get('/solicitantes/:id', {
    schema: {
      params: {
        type: 'object',
        properties: {
          id: { type: 'number' }
        }
      },
      response: {
        200: {
          type: 'object',
          properties: {
            id: { type: 'number' },
            nome: { type: 'string' },
            email: { type: 'string' }
          }
        },
        404: {
          type: 'object',
          properties: {
            error: { type: 'string' }
          }
        }
      },
      description: 'Busca solicitante por id'
    }
  }, async (request, reply) => {
    const id = Number((request.params as any).id);
    const solicitante = await prisma.solicitante.findUnique({ where: { id } });
    if (!solicitante) return reply.code(404).send({ error: 'Solicitante não encontrado' });
    return solicitante;
  });

  // CRUD de Reservas
  api.post('/reservas', {
    schema: {
      body: {
        type: 'object',
        required: ['salaId', 'solicitanteId', 'data', 'horaInicio', 'horaFim'],
        properties: {
          salaId: { type: 'number' },
          solicitanteId: { type: 'number' },
          data: { type: 'string' },
          horaInicio: { type: 'string' },
          horaFim: { type: 'string' }
        }
      },
      response: {
        200: {
          type: 'object',
          properties: {
            id: { type: 'number' },
            salaId: { type: 'number' },
            solicitanteId: { type: 'number' },
            data: { type: 'string' },
            horaInicio: { type: 'string' },
            horaFim: { type: 'string' }
          }
        },
        400: {
          type: 'object',
          properties: {
            error: { type: 'string' }
          }
        }
      },
      description: 'Cria uma nova reserva com validação de conflito'
    }
  }, async (request, reply) => {
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

  api.get('/reservas', {
    schema: {
      response: {
        200: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              id: { type: 'number' },
              salaId: { type: 'number' },
              solicitanteId: { type: 'number' },
              data: { type: 'string' },
              horaInicio: { type: 'string' },
              horaFim: { type: 'string' }
            }
          }
        }
      },
      description: 'Lista todas as reservas'
    }
  }, async () => {
    return prisma.reserva.findMany();
  });

  api.get('/reservas/:id', {
    schema: {
      params: {
        type: 'object',
        properties: {
          id: { type: 'number' }
        }
      },
      response: {
        200: {
          type: 'object',
          properties: {
            id: { type: 'number' },
            salaId: { type: 'number' },
            solicitanteId: { type: 'number' },
            data: { type: 'string' },
            horaInicio: { type: 'string' },
            horaFim: { type: 'string' }
          }
        },
        404: {
          type: 'object',
          properties: {
            error: { type: 'string' }
          }
        }
      },
      description: 'Busca reserva por id'
    }
  }, async (request, reply) => {
    const id = Number((request.params as any).id);
    const reserva = await prisma.reserva.findUnique({ where: { id } });
    if (!reserva) return reply.code(404).send({ error: 'Reserva não encontrada' });
    return reserva;
  });
}, { prefix: '/v1' });

const start = async () => {
  try {
    const port = process.env.PORT ? Number(process.env.PORT) : 3000;
    const host = process.env.HOST || '0.0.0.0';
    await app.listen({ port, host });
    console.log(`Servidor rodando em http://${host}:${port}`);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};
start();

export {};
