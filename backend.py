# backend.py
# API backend para gerenciamento de postos, combustíveis, usuários e registros de preços usando FastAPI e SQLite.

from fastapi import FastAPI, HTTPException, Depends
from pydantic import BaseModel
from typing import List
from sqlalchemy import create_engine, Column, Integer, String, Float, ForeignKey
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, Session, relationship
import logging
import os

# Configuração do banco de dados SQLite
SQLALCHEMY_DATABASE_URL = "sqlite:///./database.db"
engine = create_engine(SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

# Modelos SQLAlchemy
class PostoDB(Base):
    __tablename__ = "postos"
    id = Column(Integer, primary_key=True, index=True)
    nome = Column(String, index=True)
    endereco = Column(String)
    latitude = Column(Float)
    longitude = Column(Float)
    cor = Column(String)
    registros = relationship("RegistroPrecoDB", back_populates="posto")

class CombustivelDB(Base):
    __tablename__ = "combustiveis"
    id = Column(Integer, primary_key=True, index=True)
    nome = Column(String, index=True)
    registros = relationship("RegistroPrecoDB", back_populates="combustivel")

class UsuarioDB(Base):
    __tablename__ = "usuarios"
    id = Column(Integer, primary_key=True, index=True)
    nome = Column(String)
    email = Column(String, unique=True, index=True)
    registros = relationship("RegistroPrecoDB", back_populates="usuario")

class RegistroPrecoDB(Base):
    __tablename__ = "registros_precos"
    id = Column(Integer, primary_key=True, index=True)
    posto_id = Column(Integer, ForeignKey("postos.id"))
    combustivel_id = Column(Integer, ForeignKey("combustiveis.id"))
    valor = Column(Float)
    usuario_id = Column(Integer, ForeignKey("usuarios.id"))
    data = Column(String)
    posto = relationship("PostoDB", back_populates="registros")
    combustivel = relationship("CombustivelDB", back_populates="registros")
    usuario = relationship("UsuarioDB", back_populates="registros")

# Cria as tabelas no banco de dados
Base.metadata.create_all(bind=engine)

# Modelos Pydantic
class Posto(BaseModel):
    id: int
    nome: str
    endereco: str
    latitude: float
    longitude: float
    cor: str
    class Config:
        orm_mode = True

class Combustivel(BaseModel):
    id: int
    nome: str
    class Config:
        orm_mode = True

class Usuario(BaseModel):
    id: int
    nome: str
    email: str
    class Config:
        orm_mode = True

class RegistroPreco(BaseModel):
    id: int
    posto_id: int
    combustivel_id: int
    valor: float
    usuario_id: int
    data: str
    class Config:
        orm_mode = True

app = FastAPI()

# Dependência para obter sessão do banco
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Configuração do logging
LOG_DIR = 'logs'
os.makedirs(LOG_DIR, exist_ok=True)

logging.basicConfig(level=logging.DEBUG)

loggers = {}
for level, fname in [
    (logging.DEBUG, 'debug.log'),
    (logging.INFO, 'info.log'),
    (logging.WARNING, 'warning.log'),
    (logging.ERROR, 'error.log'),
]:
    logger = logging.getLogger(str(level))
    handler = logging.FileHandler(os.path.join(LOG_DIR, fname), encoding='utf-8')
    handler.setLevel(level)
    formatter = logging.Formatter('%(asctime)s - %(levelname)s - %(message)s')
    handler.setFormatter(formatter)
    logger.addHandler(handler)
    logger.setLevel(level)
    loggers[level] = logger

# Função utilitária para logar em todos os níveis
def log(level, msg):
    if level in loggers:
        loggers[level].log(level, msg)
    else:
        logging.log(level, msg)

# Endpoints CRUD para Postos
@app.post("/postos", response_model=Posto)
def create_posto(posto: Posto, db: Session = Depends(get_db)):
    log(logging.INFO, f"Criando posto: {posto.nome}")
    try:
        db_posto = PostoDB(**posto.dict())
        db.add(db_posto)
        db.commit()
        db.refresh(db_posto)
        log(logging.DEBUG, f"Posto criado com sucesso: {db_posto}")
        return db_posto
    except Exception as e:
        log(logging.ERROR, f"Erro ao criar posto: {e}")
        raise

@app.get("/postos", response_model=List[Posto])
def list_postos(db: Session = Depends(get_db)):
    return db.query(PostoDB).all()

@app.get("/postos/{posto_id}", response_model=Posto)
def get_posto(posto_id: int, db: Session = Depends(get_db)):
    posto = db.query(PostoDB).filter(PostoDB.id == posto_id).first()
    if not posto:
        raise HTTPException(status_code=404, detail="Posto não encontrado")
    return posto

@app.put("/postos/{posto_id}", response_model=Posto)
def update_posto(posto_id: int, posto: Posto, db: Session = Depends(get_db)):
    db_posto = db.query(PostoDB).filter(PostoDB.id == posto_id).first()
    if not db_posto:
        raise HTTPException(status_code=404, detail="Posto não encontrado")
    for key, value in posto.dict().items():
        setattr(db_posto, key, value)
    db.commit()
    db.refresh(db_posto)
    return db_posto

@app.delete("/postos/{posto_id}")
def delete_posto(posto_id: int, db: Session = Depends(get_db)):
    db_posto = db.query(PostoDB).filter(PostoDB.id == posto_id).first()
    if not db_posto:
        raise HTTPException(status_code=404, detail="Posto não encontrado")
    db.delete(db_posto)
    db.commit()
    return {"detail": "Posto deletado"}

# Endpoints CRUD para Combustíveis
@app.post("/combustiveis", response_model=Combustivel)
def create_combustivel(combustivel: Combustivel, db: Session = Depends(get_db)):
    db_comb = CombustivelDB(**combustivel.dict())
    db.add(db_comb)
    db.commit()
    db.refresh(db_comb)
    return db_comb

@app.get("/combustiveis", response_model=List[Combustivel])
def list_combustiveis(db: Session = Depends(get_db)):
    return db.query(CombustivelDB).all()

@app.get("/combustiveis/{combustivel_id}", response_model=Combustivel)
def get_combustivel(combustivel_id: int, db: Session = Depends(get_db)):
    combustivel = db.query(CombustivelDB).filter(CombustivelDB.id == combustivel_id).first()
    if not combustivel:
        raise HTTPException(status_code=404, detail="Combustível não encontrado")
    return combustivel

@app.put("/combustiveis/{combustivel_id}", response_model=Combustivel)
def update_combustivel(combustivel_id: int, combustivel: Combustivel, db: Session = Depends(get_db)):
    db_comb = db.query(CombustivelDB).filter(CombustivelDB.id == combustivel_id).first()
    if not db_comb:
        raise HTTPException(status_code=404, detail="Combustível não encontrado")
    for key, value in combustivel.dict().items():
        setattr(db_comb, key, value)
    db.commit()
    db.refresh(db_comb)
    return db_comb

@app.delete("/combustiveis/{combustivel_id}")
def delete_combustivel(combustivel_id: int, db: Session = Depends(get_db)):
    db_comb = db.query(CombustivelDB).filter(CombustivelDB.id == combustivel_id).first()
    if not db_comb:
        raise HTTPException(status_code=404, detail="Combustível não encontrado")
    db.delete(db_comb)
    db.commit()
    return {"detail": "Combustível deletado"}

# Endpoints CRUD para Usuários
@app.post("/usuarios", response_model=Usuario)
def create_usuario(usuario: Usuario, db: Session = Depends(get_db)):
    db_usuario = UsuarioDB(**usuario.dict())
    db.add(db_usuario)
    db.commit()
    db.refresh(db_usuario)
    return db_usuario

@app.get("/usuarios", response_model=List[Usuario])
def list_usuarios(db: Session = Depends(get_db)):
    return db.query(UsuarioDB).all()

@app.get("/usuarios/{usuario_id}", response_model=Usuario)
def get_usuario(usuario_id: int, db: Session = Depends(get_db)):
    usuario = db.query(UsuarioDB).filter(UsuarioDB.id == usuario_id).first()
    if not usuario:
        raise HTTPException(status_code=404, detail="Usuário não encontrado")
    return usuario

@app.put("/usuarios/{usuario_id}", response_model=Usuario)
def update_usuario(usuario_id: int, usuario: Usuario, db: Session = Depends(get_db)):
    db_usuario = db.query(UsuarioDB).filter(UsuarioDB.id == usuario_id).first()
    if not db_usuario:
        raise HTTPException(status_code=404, detail="Usuário não encontrado")
    for key, value in usuario.dict().items():
        setattr(db_usuario, key, value)
    db.commit()
    db.refresh(db_usuario)
    return db_usuario

@app.delete("/usuarios/{usuario_id}")
def delete_usuario(usuario_id: int, db: Session = Depends(get_db)):
    db_usuario = db.query(UsuarioDB).filter(UsuarioDB.id == usuario_id).first()
    if not db_usuario:
        raise HTTPException(status_code=404, detail="Usuário não encontrado")
    db.delete(db_usuario)
    db.commit()
    return {"detail": "Usuário deletado"}

# Endpoints CRUD para Registros de Preços
@app.post("/registros_precos", response_model=RegistroPreco)
def create_registro_preco(registro: RegistroPreco, db: Session = Depends(get_db)):
    db_registro = RegistroPrecoDB(**registro.dict())
    db.add(db_registro)
    db.commit()
    db.refresh(db_registro)
    return db_registro

@app.get("/registros_precos", response_model=List[RegistroPreco])
def list_registros_precos(db: Session = Depends(get_db)):
    return db.query(RegistroPrecoDB).all()

@app.get("/registros_precos/{registro_id}", response_model=RegistroPreco)
def get_registro_preco(registro_id: int, db: Session = Depends(get_db)):
    registro = db.query(RegistroPrecoDB).filter(RegistroPrecoDB.id == registro_id).first()
    if not registro:
        raise HTTPException(status_code=404, detail="Registro não encontrado")
    return registro

@app.put("/registros_precos/{registro_id}", response_model=RegistroPreco)
def update_registro_preco(registro_id: int, registro: RegistroPreco, db: Session = Depends(get_db)):
    db_registro = db.query(RegistroPrecoDB).filter(RegistroPrecoDB.id == registro_id).first()
    if not db_registro:
        raise HTTPException(status_code=404, detail="Registro não encontrado")
    for key, value in registro.dict().items():
        setattr(db_registro, key, value)
    db.commit()
    db.refresh(db_registro)
    return db_registro

@app.delete("/registros_precos/{registro_id}")
def delete_registro_preco(registro_id: int, db: Session = Depends(get_db)):
    db_registro = db.query(RegistroPrecoDB).filter(RegistroPrecoDB.id == registro_id).first()
    if not db_registro:
        raise HTTPException(status_code=404, detail="Registro não encontrado")
    db.delete(db_registro)
    db.commit()
    return {"detail": "Registro deletado"}
