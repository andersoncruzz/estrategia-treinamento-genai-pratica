# models/posto.py
from pydantic import BaseModel
from typing import Optional

class Posto(BaseModel):
    id: int
    nome: str
    endereco: str
    bandeira: Optional[str]
    cnpj: Optional[str]
