# models/abastecimento.py
from pydantic import BaseModel
from datetime import datetime

class Abastecimento(BaseModel):
    id: int
    posto_id: int
    condutor_id: int
    combustivel_id: int
    data: datetime
    quantidade: float
    valor_total: float
