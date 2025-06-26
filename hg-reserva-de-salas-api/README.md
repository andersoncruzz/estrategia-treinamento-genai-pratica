# Sistema de Reserva de Salas

API REST para agendamento e gerenciamento de reservas de salas, desenvolvida com Fastify, Prisma e documentação automática via Swagger.

## Funcionalidades
- Cadastro de salas
- Listagem de salas
- Cadastro de solicitantes
- Listagem de solicitantes
- Cadastro de reservas (associando sala e solicitante)
- Listagem de reservas
- Validação de conflitos de horário
- Documentação automática da API em /docs

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
   npm run prisma:db
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

A documentação Swagger estará disponível em http://localhost:3000/docs

## Endpoints principais

Todas as rotas estão sob o prefixo `/v1`.

### Salas
- `POST /v1/salas` — Cadastrar nova sala
- `GET /v1/salas` — Listar todas as salas
- `GET /v1/salas/:id` — Buscar sala por id

### Solicitantes
- `POST /v1/solicitantes` — Cadastrar novo solicitante
- `GET /v1/solicitantes` — Listar todos os solicitantes
- `GET /v1/solicitantes/:id` — Buscar solicitante por id

### Reservas
- `POST /v1/reservas` — Cadastrar nova reserva (com validação de conflito e associação a solicitante)
- `GET /v1/reservas` — Listar todas as reservas
- `GET /v1/reservas/:id` — Buscar reserva por id

## Exemplos de Requisições

### Criar Sala
`POST /v1/salas`
```json
{
  "nome": "Sala de Reunião 1"
}
```

### Criar Solicitante
`POST /v1/solicitantes`
```json
{
  "nome": "Maria Silva",
  "email": "maria@email.com"
}
```

### Criar Reserva
`POST /v1/reservas`
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
