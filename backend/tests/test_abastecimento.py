import pytest
from fastapi.testclient import TestClient
from app.main import app
from app.models import models
from datetime import datetime
import random

client = TestClient(app)

def test_criar_listar_abastecimento():
    # Gerar IDs aleatórios
    posto_id = random.randint(1000, 9999)
    condutor_id = random.randint(1000, 9999)
    combustivel_id = random.randint(1000, 9999)
    abastecimento_id = random.randint(1000, 9999)

    # Pré-requisitos: criar posto, condutor e combustivel
    client.post("/postos", json={"id": posto_id, "nome": "Posto Teste", "endereco": "Rua 1", "bandeira": "Bandeira X", "cnpj": "123456789"})
    client.post("/condutores", json={"id": condutor_id, "nome": "João", "cpf": "11122233344", "veiculo": "Carro"})
    client.post("/combustiveis", json={"id": combustivel_id, "tipo": "Gasolina", "preco": 5.99, "unidade": "litro"})
    response = client.post("/abastecimentos", json={
        "id": abastecimento_id,
        "posto_id": posto_id,
        "condutor_id": condutor_id,
        "combustivel_id": combustivel_id,
        "data": datetime.now().isoformat(),
        "quantidade": 10.0,
        "valor_total": 59.9
    })
    assert response.status_code == 200
    data = response.json()
    assert data["quantidade"] == 10.0

    response = client.get("/abastecimentos")
    assert response.status_code == 200
    assert any(a["quantidade"] == 10.0 for a in response.json())
