from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from typing import List
from app.db import SessionLocal
from app.models import models
from pydantic import BaseModel
import random

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

class CombustivelSchema(BaseModel):
    id: int
    tipo: str
    preco: float
    unidade: str = "litro"
    class Config:
        orm_mode = True

@router.post("/combustiveis", response_model=CombustivelSchema)
def criar_combustivel(combustivel: CombustivelSchema, db: Session = Depends(get_db)):
    combustivel_data = combustivel.model_dump()
    combustivel_data["id"] = random.randint(1000, 9999)
    db_combustivel = models.Combustivel(**combustivel_data)
    db.add(db_combustivel)
    db.commit()
    db.refresh(db_combustivel)
    return db_combustivel

@router.get("/combustiveis", response_model=List[CombustivelSchema])
def listar_combustiveis(db: Session = Depends(get_db)):
    return db.query(models.Combustivel).all()

@router.get("/combustiveis/{combustivel_id}", response_model=CombustivelSchema)
def obter_combustivel(combustivel_id: int, db: Session = Depends(get_db)):
    combustivel = db.query(models.Combustivel).filter(models.Combustivel.id == combustivel_id).first()
    if not combustivel:
        raise HTTPException(status_code=404, detail="Combustível não encontrado")
    return combustivel

@router.put("/combustiveis/{combustivel_id}", response_model=CombustivelSchema)
def atualizar_combustivel(combustivel_id: int, combustivel_atualizado: CombustivelSchema, db: Session = Depends(get_db)):
    combustivel = db.query(models.Combustivel).filter(models.Combustivel.id == combustivel_id).first()
    if not combustivel:
        raise HTTPException(status_code=404, detail="Combustível não encontrado")
    for key, value in combustivel_atualizado.model_dump().items():
        setattr(combustivel, key, value)
    db.commit()
    db.refresh(combustivel)
    return combustivel

@router.delete("/combustiveis/{combustivel_id}")
def deletar_combustivel(combustivel_id: int, db: Session = Depends(get_db)):
    combustivel = db.query(models.Combustivel).filter(models.Combustivel.id == combustivel_id).first()
    if not combustivel:
        raise HTTPException(status_code=404, detail="Combustível não encontrado")
    db.delete(combustivel)
    db.commit()
    return {"ok": True}
