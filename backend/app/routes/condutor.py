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

class CondutorSchema(BaseModel):
    id: int
    nome: str
    cpf: str | None = None
    veiculo: str | None = None
    class Config:
        orm_mode = True

@router.post("/condutores", response_model=CondutorSchema)
def criar_condutor(condutor: CondutorSchema, db: Session = Depends(get_db)):
    random_id = random.randint(100000, 999999)
    db_condutor = models.Condutor(id=random_id, **condutor.model_dump(exclude={"id"}))
    db.add(db_condutor)
    db.commit()
    db.refresh(db_condutor)
    return db_condutor

@router.get("/condutores", response_model=List[CondutorSchema])
def listar_condutores(db: Session = Depends(get_db)):
    return db.query(models.Condutor).all()

@router.get("/condutores/{condutor_id}", response_model=CondutorSchema)
def obter_condutor(condutor_id: int, db: Session = Depends(get_db)):
    condutor = db.query(models.Condutor).filter(models.Condutor.id == condutor_id).first()
    if not condutor:
        raise HTTPException(status_code=404, detail="Condutor não encontrado")
    return condutor

@router.put("/condutores/{condutor_id}", response_model=CondutorSchema)
def atualizar_condutor(condutor_id: int, condutor_atualizado: CondutorSchema, db: Session = Depends(get_db)):
    condutor = db.query(models.Condutor).filter(models.Condutor.id == condutor_id).first()
    if not condutor:
        raise HTTPException(status_code=404, detail="Condutor não encontrado")
    for key, value in condutor_atualizado.model_dump().items():
        setattr(condutor, key, value)
    db.commit()
    db.refresh(condutor)
    return condutor

@router.delete("/condutores/{condutor_id}")
def deletar_condutor(condutor_id: int, db: Session = Depends(get_db)):
    condutor = db.query(models.Condutor).filter(models.Condutor.id == condutor_id).first()
    if not condutor:
        raise HTTPException(status_code=404, detail="Condutor não encontrado")
    db.delete(condutor)
    db.commit()
    return {"ok": True}
