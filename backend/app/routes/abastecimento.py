from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from typing import List
from app.db import SessionLocal
from app.models import models
from pydantic import BaseModel
from datetime import datetime
import random

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

class AbastecimentoSchema(BaseModel):
    id: int
    posto_id: int
    condutor_id: int
    combustivel_id: int
    data: datetime
    quantidade: float
    valor_total: float
    class Config:
        orm_mode = True

@router.post("/abastecimentos", response_model=AbastecimentoSchema)
def criar_abastecimento(abastecimento: AbastecimentoSchema, db: Session = Depends(get_db)):
    # Gera um id aleatório entre 1 e 1_000_000
    random_id = random.randint(1, 1_000_000)
    abastecimento_data = abastecimento.model_dump()
    abastecimento_data["id"] = random_id
    db_abastecimento = models.Abastecimento(**abastecimento_data)
    db.add(db_abastecimento)
    db.commit()
    db.refresh(db_abastecimento)
    return db_abastecimento

@router.get("/abastecimentos", response_model=List[AbastecimentoSchema])
def listar_abastecimentos(db: Session = Depends(get_db)):
    return db.query(models.Abastecimento).all()

@router.get("/abastecimentos/{abastecimento_id}", response_model=AbastecimentoSchema)
def obter_abastecimento(abastecimento_id: int, db: Session = Depends(get_db)):
    abastecimento = db.query(models.Abastecimento).filter(models.Abastecimento.id == abastecimento_id).first()
    if not abastecimento:
        raise HTTPException(status_code=404, detail="Abastecimento não encontrado")
    return abastecimento

@router.put("/abastecimentos/{abastecimento_id}", response_model=AbastecimentoSchema)
def atualizar_abastecimento(abastecimento_id: int, abastecimento_atualizado: AbastecimentoSchema, db: Session = Depends(get_db)):
    abastecimento = db.query(models.Abastecimento).filter(models.Abastecimento.id == abastecimento_id).first()
    if not abastecimento:
        raise HTTPException(status_code=404, detail="Abastecimento não encontrado")
    for key, value in abastecimento_atualizado.model_dump().items():
        setattr(abastecimento, key, value)
    db.commit()
    db.refresh(abastecimento)
    return abastecimento

@router.delete("/abastecimentos/{abastecimento_id}")
def deletar_abastecimento(abastecimento_id: int, db: Session = Depends(get_db)):
    abastecimento = db.query(models.Abastecimento).filter(models.Abastecimento.id == abastecimento_id).first()
    if not abastecimento:
        raise HTTPException(status_code=404, detail="Abastecimento não encontrado")
    db.delete(abastecimento)
    db.commit()
    return {"ok": True}
