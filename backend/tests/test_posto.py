import pytest
from fastapi.testclient import TestClient
from app.main import app
import random

client = TestClient(app)

def test_criar_listar_posto():

    postos_id = random.randint(1000, 9999)

    response = client.post("/postos", json={"id": postos_id, "nome": "Posto Teste", "endereco": "Rua 1", "bandeira": "Bandeira X", "cnpj": "123456789"})
    assert response.status_code == 200
    data = response.json()
    assert data["nome"] == "Posto Teste"

    response = client.get("/postos")
    assert response.status_code == 200
    assert any(p["nome"] == "Posto Teste" for p in response.json())
