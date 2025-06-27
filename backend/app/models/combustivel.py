# models/combustivel.py
from pydantic import BaseModel

class Combustivel(BaseModel):
    id: int
    tipo: str  # Ex: Gasolina, Etanol, Diesel
    preco: float
    unidade: str = 'litro'
