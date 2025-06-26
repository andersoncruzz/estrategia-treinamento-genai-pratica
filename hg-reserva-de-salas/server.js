// server.js
const fastify = require('fastify')({ logger: true })
const sqlite3 = require('sqlite3').verbose()
const path = require('path')

// Inicializa o banco de dados SQLite
const db = new sqlite3.Database(path.join(__dirname, 'db.sqlite'))

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS salas (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL
  )`)
  db.run(`CREATE TABLE IF NOT EXISTS solicitantes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    email TEXT NOT NULL
  )`)
  db.run(`CREATE TABLE IF NOT EXISTS reservas (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    salaId INTEGER NOT NULL,
    solicitanteId INTEGER NOT NULL,
    data TEXT NOT NULL,
    horaInicio TEXT NOT NULL,
    horaFim TEXT NOT NULL,
    FOREIGN KEY (salaId) REFERENCES salas(id),
    FOREIGN KEY (solicitanteId) REFERENCES solicitantes(id)
  )`)
})

// CRUD de Salas
fastify.post('/salas', async (request, reply) => {
  const { nome } = request.body
  return new Promise((resolve, reject) => {
    db.run('INSERT INTO salas (nome) VALUES (?)', [nome], function (err) {
      if (err) return reject(reply.code(500).send({ error: 'Erro ao criar sala' }))
      resolve({ id: this.lastID, nome })
    })
  })
})

fastify.get('/salas', async () => {
  return new Promise((resolve, reject) => {
    db.all('SELECT * FROM salas', [], (err, rows) => {
      if (err) return reject([])
      resolve(rows)
    })
  })
})

fastify.get('/salas/:id', async (request, reply) => {
  const id = Number(request.params.id)
  return new Promise((resolve, reject) => {
    db.get('SELECT * FROM salas WHERE id = ?', [id], (err, row) => {
      if (err || !row) return reject(reply.code(404).send({ error: 'Sala não encontrada' }))
      resolve(row)
    })
  })
})

// CRUD de Solicitantes
fastify.post('/solicitantes', async (request, reply) => {
  const { nome, email } = request.body
  return new Promise((resolve, reject) => {
    db.run('INSERT INTO solicitantes (nome, email) VALUES (?, ?)', [nome, email], function (err) {
      if (err) return reject(reply.code(500).send({ error: 'Erro ao criar solicitante' }))
      resolve({ id: this.lastID, nome, email })
    })
  })
})

fastify.get('/solicitantes', async () => {
  return new Promise((resolve, reject) => {
    db.all('SELECT * FROM solicitantes', [], (err, rows) => {
      if (err) return reject([])
      resolve(rows)
    })
  })
})

fastify.get('/solicitantes/:id', async (request, reply) => {
  const id = Number(request.params.id)
  return new Promise((resolve, reject) => {
    db.get('SELECT * FROM solicitantes WHERE id = ?', [id], (err, row) => {
      if (err || !row) return reject(reply.code(404).send({ error: 'Solicitante não encontrado' }))
      resolve(row)
    })
  })
})

// CRUD de Reservas
fastify.post('/reservas', async (request, reply) => {
  const { salaId, solicitanteId, data, horaInicio, horaFim } = request.body
  // Validação de conflito
  return new Promise((resolve, reject) => {
    db.all(
      `SELECT * FROM reservas WHERE salaId = ? AND data = ? AND (
        (? >= horaInicio AND ? < horaFim) OR
        (? > horaInicio AND ? <= horaFim) OR
        (? <= horaInicio AND ? >= horaFim)
      )`,
      [salaId, data, horaInicio, horaInicio, horaFim, horaFim, horaInicio, horaFim],
      (err, rows) => {
        if (err) return reject(reply.code(500).send({ error: 'Erro ao validar conflito' }))
        if (rows.length > 0) return reject(reply.code(400).send({ error: 'Conflito de horário' }))
        db.run(
          'INSERT INTO reservas (salaId, solicitanteId, data, horaInicio, horaFim) VALUES (?, ?, ?, ?, ?)',
          [salaId, solicitanteId, data, horaInicio, horaFim],
          function (err) {
            if (err) return reject(reply.code(500).send({ error: 'Erro ao criar reserva' }))
            resolve({ id: this.lastID, salaId, solicitanteId, data, horaInicio, horaFim })
          }
        )
      }
    )
  })
})

fastify.get('/reservas', async () => {
  return new Promise((resolve, reject) => {
    db.all('SELECT * FROM reservas', [], (err, rows) => {
      if (err) return reject([])
      resolve(rows)
    })
  })
})

fastify.get('/reservas/:id', async (request, reply) => {
  const id = Number(request.params.id)
  return new Promise((resolve, reject) => {
    db.get('SELECT * FROM reservas WHERE id = ?', [id], (err, row) => {
      if (err || !row) return reject(reply.code(404).send({ error: 'Reserva não encontrada' }))
      resolve(row)
    })
  })
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
