# Backend - Monitoramento de Preços de Combustíveis

Este projeto é um backend desenvolvido em FastAPI para monitoramento de preços de combustíveis, permitindo o cadastro e consulta de postos, combustíveis, condutores e abastecimentos. O sistema utiliza banco de dados SQLite e segue boas práticas de organização de código.

## Ideia do Projeto

O objetivo é fornecer uma API para registrar e consultar informações sobre:
- **Postos de combustíveis**
- **Tipos de combustíveis**
- **Condutores**
- **Abastecimentos realizados**

Esses dados podem ser utilizados para análises, relatórios e acompanhamento de preços e consumo.

---

## Classes de Modelo

- **Posto**
  - `id`: int
  - `nome`: str
  - `endereco`: str
  - `bandeira`: str (opcional)
  - `cnpj`: str (opcional)

- **Combustível**
  - `id`: int
  - `tipo`: str
  - `preco`: float
  - `unidade`: str

- **Condutor**
  - `id`: int
  - `nome`: str
  - `cpf`: str
  - `veiculo`: str

- **Abastecimento**
  - `id`: int
  - `posto_id`: int (relacionamento)
  - `condutor_id`: int (relacionamento)
  - `combustivel_id`: int (relacionamento)
  - `data`: datetime
  - `quantidade`: float
  - `valor_total`: float

---

## Rotas e Endpoints

Cada entidade possui rotas CRUD (Create, Read, Update, Delete):

- **Postos**
  - `POST /postos` - Cadastrar posto
  - `GET /postos` - Listar postos
  - `GET /postos/{posto_id}` - Detalhar posto
  - `PUT /postos/{posto_id}` - Atualizar posto
  - `DELETE /postos/{posto_id}` - Remover posto

- **Combustíveis**
  - `POST /combustiveis` - Cadastrar combustível
  - `GET /combustiveis` - Listar combustíveis
  - `GET /combustiveis/{combustivel_id}` - Detalhar combustível
  - `PUT /combustiveis/{combustivel_id}` - Atualizar combustível
  - `DELETE /combustiveis/{combustivel_id}` - Remover combustível

- **Condutores**
  - `POST /condutores` - Cadastrar condutor
  - `GET /condutores` - Listar condutores
  - `GET /condutores/{condutor_id}` - Detalhar condutor
  - `PUT /condutores/{condutor_id}` - Atualizar condutor
  - `DELETE /condutores/{condutor_id}` - Remover condutor

- **Abastecimentos**
  - `POST /abastecimentos` - Registrar abastecimento
  - `GET /abastecimentos` - Listar abastecimentos
  - `GET /abastecimentos/{abastecimento_id}` - Detalhar abastecimento
  - `PUT /abastecimentos/{abastecimento_id}` - Atualizar abastecimento
  - `DELETE /abastecimentos/{abastecimento_id}` - Remover abastecimento

A documentação interativa da API pode ser acessada em `/docs` após iniciar o servidor.

---

## Banco de Dados

- **SQLite**  
  O projeto utiliza SQLite, com SQLAlchemy como ORM. O arquivo do banco é criado automaticamente na pasta `app/`.


---

## Dependências

- [FastAPI](https://fastapi.tiangolo.com/)
- [Uvicorn](https://www.uvicorn.org/) (servidor ASGI)
- [SQLAlchemy](https://www.sqlalchemy.org/) (ORM)
- [Pydantic](https://docs.pydantic.dev/) (validação de dados)
- [pytest](https://docs.pytest.org/) (testes)
- [python-dotenv](https://pypi.org/project/python-dotenv/) (opcional, para variáveis de ambiente)

Instale as dependências com:

```bash
pip install fastapi uvicorn sqlalchemy pydantic pytest
```

---

## Como Executar

1. **Clone o repositório e acesse a pasta do backend:**
    ```bash
    cd backend
    ```

2. **Instale as dependências:**
    ```bash
    pip install -r requirements.txt
    ```
    Ou instale manualmente conforme acima.

3. **Execute os testes (opcional):**
    ```bash
    pytest
    ```

4. **Inicie o servidor FastAPI:**
    ```bash
    uvicorn app.main:app --reload
    ```

5. **Acesse a documentação interativa:**
    - [http://localhost:8000/docs](http://localhost:8000/docs)

---

## Estrutura de Pastas

```
backend/
│
├── app/
│   ├── main.py
│   ├── db/
│   ├── models/
│   └── routes/
│
└── tests/
```

---

## Testes

Os testes automatizados estão na pasta `tests/`. Para rodar:

```bash
pytest
```

---

## Observações

- O projeto está pronto para ser expandido com autenticação, filtros, paginação e outras funcionalidades.
- Para ambiente de produção, recomenda-se configurar variáveis de ambiente e um banco de dados mais robusto que o SQLite.
