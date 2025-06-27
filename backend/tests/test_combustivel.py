import pytest
from fastapi.testclient import TestClient
from app.main import app
import random

client = TestClient(app)

def test_criar_listar_combustivel():
        # Gerar IDs aleatórios
    combustivel_id = random.randint(1000, 9999)

    response = client.post("/combustiveis", json={"id": combustivel_id, "tipo": "Gasolina", "preco": 5.99, "unidade": "litro"})
    assert response.status_code == 200
    data = response.json()
    assert data["tipo"] == "Gasolina"

    response = client.get("/combustiveis")
    assert response.status_code == 200
    assert any(c["tipo"] == "Gasolina" for c in response.json())
