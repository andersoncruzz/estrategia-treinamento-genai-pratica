# Sistema de Reserva de Salas

API REST para agendamento e gerenciamento de reservas de salas, desenvolvida com Fastify e Prisma.

## Funcionalidades
- Cadastro de salas
- Listagem de salas
- Cadastro de solicitantes
- Listagem de solicitantes
- Cadastro de reservas (associando sala e solicitante)
- Listagem de reservas
- Validação de conflitos de horário

## Instalação

1. Certifique-se de ter o Node.js instalado.
2. No terminal, acesse a pasta do projeto:
   ```bash
   cd hg-reserva-de-salas-api
   ```
3. Instale as dependências:
   ```bash
   npm install
   ```

## Configuração do Banco de Dados

1. Gere o banco de dados SQLite e o Prisma Client:
   ```bash
   npx prisma migrate dev --name init
   npx prisma generate
   ```
   Isso criará o arquivo `prisma/dev.db` e aplicará o schema definido em `prisma/schema.prisma`.

## Como executar

1. Compile o projeto:
   ```bash
   npm run build
   ```
2. Inicie o servidor:
   ```bash
   npm start
   ```

O servidor estará disponível em http://localhost:3000

## Endpoints principais

### Salas
- `POST /salas` — Cadastrar nova sala
- `GET /salas` — Listar todas as salas
- `GET /salas/:id` — Buscar sala por id

### Solicitantes
- `POST /solicitantes` — Cadastrar novo solicitante
- `GET /solicitantes` — Listar todos os solicitantes
- `GET /solicitantes/:id` — Buscar solicitante por id

### Reservas
- `POST /reservas` — Cadastrar nova reserva (com validação de conflito e associação a solicitante)
- `GET /reservas` — Listar todas as reservas
- `GET /reservas/:id` — Buscar reserva por id

## Exemplos de Requisições

### Criar Sala
`POST /salas`
```json
{
  "nome": "Sala de Reunião 1"
}
```

### Criar Solicitante
`POST /solicitantes`
```json
{
  "nome": "Maria Silva",
  "email": "maria@email.com"
}
```

### Criar Reserva
`POST /reservas`
```json
{
  "salaId": 1,
  "solicitanteId": 1,
  "data": "2024-06-10",
  "horaInicio": "09:00",
  "horaFim": "10:00"
}
```

## Observação

Os dados são armazenados em um banco SQLite local (`prisma/dev.db`). Cada reserva deve ser associada a um solicitante já cadastrado.
