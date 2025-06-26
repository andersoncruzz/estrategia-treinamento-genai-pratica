# Sistema de Reserva de Salas

API REST para agendamento e gerenciamento de reservas de salas, desenvolvida com Fastify.

## Funcionalidades
- Cadastro de salas
- Listagem de salas
- Cadastro de reservas
- Listagem de reservas
- Validação de conflitos de horário

## Instalação

1. Certifique-se de ter o Node.js instalado.
2. No terminal, acesse a pasta do projeto:
   ```bash
   cd hg-reserva-de-salas
   ```
3. Instale as dependências:
   ```bash
   npm install
   ```

## Como executar

Inicie o servidor com:
```bash
npm start
```

O servidor estará disponível em http://localhost:3000

## Endpoints principais

- `POST /salas` — Cadastrar nova sala
- `GET /salas` — Listar todas as salas
- `POST /reservas` — Cadastrar nova reserva (com validação de conflito)
- `GET /reservas` — Listar todas as reservas

## Exemplos de Requisições

### Criar Sala
`POST /salas`
```json
{
  "nome": "Sala de Reunião 1"
}
```

### Criar Reserva
`POST /reservas`
```json
{
  "salaId": 1,
  "data": "2024-06-10",
  "horaInicio": "09:00",
  "horaFim": "10:00"
}
```

## Observação

Os dados são armazenados em memória (não persistem após reiniciar o servidor).
