import pytest
from fastapi.testclient import TestClient
from app.main import app
import random

client = TestClient(app)

def test_criar_listar_condutor():
    
    condutor_id = random.randint(1000, 9999)

    response = client.post("/condutores", json={"id": condutor_id, "nome": "João", "cpf": "11122233344", "veiculo": "Carro"})
    assert response.status_code == 200
    data = response.json()
    assert data["nome"] == "João"

    response = client.get("/condutores")
    assert response.status_code == 200
    assert any(c["nome"] == "João" for c in response.json())
