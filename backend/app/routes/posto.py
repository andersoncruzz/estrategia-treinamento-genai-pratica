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

class PostoSchema(BaseModel):
    id: int
    nome: str
    endereco: str
    bandeira: str | None = None
    cnpj: str | None = None
    class Config:
        orm_mode = True

@router.post("/postos", response_model=PostoSchema)
def criar_posto(posto: PostoSchema, db: Session = Depends(get_db)):
    random_id = random.randint(100000, 999999)
    db_posto = models.Posto(id=random_id, **posto.model_dump(exclude={"id"}))
    db.add(db_posto)
    db.commit()
    db.refresh(db_posto)
    return db_posto

@router.get("/postos", response_model=List[PostoSchema])
def listar_postos(db: Session = Depends(get_db)):
    return db.query(models.Posto).all()

@router.get("/postos/{posto_id}", response_model=PostoSchema)
def obter_posto(posto_id: int, db: Session = Depends(get_db)):
    posto = db.query(models.Posto).filter(models.Posto.id == posto_id).first()
    if not posto:
        raise HTTPException(status_code=404, detail="Posto não encontrado")
    return posto

@router.put("/postos/{posto_id}", response_model=PostoSchema)
def atualizar_posto(posto_id: int, posto_atualizado: PostoSchema, db: Session = Depends(get_db)):
    posto = db.query(models.Posto).filter(models.Posto.id == posto_id).first()
    if not posto:
        raise HTTPException(status_code=404, detail="Posto não encontrado")
    for key, value in posto_atualizado.model_dump().items():
        setattr(posto, key, value)
    db.commit()
    db.refresh(posto)
    return posto

@router.delete("/postos/{posto_id}")
def deletar_posto(posto_id: int, db: Session = Depends(get_db)):
    posto = db.query(models.Posto).filter(models.Posto.id == posto_id).first()
    if not posto:
        raise HTTPException(status_code=404, detail="Posto não encontrado")
    db.delete(posto)
    db.commit()
    return {"ok": True}
