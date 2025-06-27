# models/condutor.py
from pydantic import BaseModel
from typing import Optional

class Condutor(BaseModel):
    id: int
    nome: str
    cpf: Optional[str]
    veiculo: Optional[str]
