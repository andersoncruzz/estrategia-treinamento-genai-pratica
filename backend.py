from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List, Optional

app = FastAPI()

# Modelos
class Posto(BaseModel):
    id: int
    nome: str
    endereco: str
    latitude: float
    longitude: float
    cor: str

class Combustivel(BaseModel):
    id: int
    nome: str

class Usuario(BaseModel):
    id: int
    nome: str
    email: str

class RegistroPreco(BaseModel):
    id: int
    posto_id: int
    combustivel_id: int
    valor: float
    usuario_id: int
    data: str  # ISO date

# Bancos de dados em memória
postos_db = []
combustiveis_db = []
usuarios_db = []
registros_precos_db = []

# Endpoints Postos
def get_next_id(db):
    return max([item.id for item in db], default=0) + 1

@app.post("/postos", response_model=Posto)
def create_posto(posto: Posto):
    posto.id = get_next_id(postos_db)
    postos_db.append(posto)
    return posto

@app.get("/postos", response_model=List[Posto])
def list_postos():
    return postos_db

@app.get("/postos/{posto_id}", response_model=Posto)
def get_posto(posto_id: int):
    for posto in postos_db:
        if posto.id == posto_id:
            return posto
    raise HTTPException(status_code=404, detail="Posto não encontrado")

@app.put("/postos/{posto_id}", response_model=Posto)
def update_posto(posto_id: int, posto: Posto):
    for idx, p in enumerate(postos_db):
        if p.id == posto_id:
            posto.id = posto_id
            postos_db[idx] = posto
            return posto
    raise HTTPException(status_code=404, detail="Posto não encontrado")

@app.delete("/postos/{posto_id}")
def delete_posto(posto_id: int):
    for idx, p in enumerate(postos_db):
        if p.id == posto_id:
            del postos_db[idx]
            return {"detail": "Posto deletado"}
    raise HTTPException(status_code=404, detail="Posto não encontrado")

# Endpoints Combustíveis
@app.post("/combustiveis", response_model=Combustivel)
def create_combustivel(combustivel: Combustivel):
    combustivel.id = get_next_id(combustiveis_db)
    combustiveis_db.append(combustivel)
    return combustivel

@app.get("/combustiveis", response_model=List[Combustivel])
def list_combustiveis():
    return combustiveis_db

@app.get("/combustiveis/{combustivel_id}", response_model=Combustivel)
def get_combustivel(combustivel_id: int):
    for c in combustiveis_db:
        if c.id == combustivel_id:
            return c
    raise HTTPException(status_code=404, detail="Combustível não encontrado")

@app.put("/combustiveis/{combustivel_id}", response_model=Combustivel)
def update_combustivel(combustivel_id: int, combustivel: Combustivel):
    for idx, c in enumerate(combustiveis_db):
        if c.id == combustivel_id:
            combustivel.id = combustivel_id
            combustiveis_db[idx] = combustivel
            return combustivel
    raise HTTPException(status_code=404, detail="Combustível não encontrado")

@app.delete("/combustiveis/{combustivel_id}")
def delete_combustivel(combustivel_id: int):
    for idx, c in enumerate(combustiveis_db):
        if c.id == combustivel_id:
            del combustiveis_db[idx]
            return {"detail": "Combustível deletado"}
    raise HTTPException(status_code=404, detail="Combustível não encontrado")

# Endpoints Usuários
@app.post("/usuarios", response_model=Usuario)
def create_usuario(usuario: Usuario):
    usuario.id = get_next_id(usuarios_db)
    usuarios_db.append(usuario)
    return usuario

@app.get("/usuarios", response_model=List[Usuario])
def list_usuarios():
    return usuarios_db

@app.get("/usuarios/{usuario_id}", response_model=Usuario)
def get_usuario(usuario_id: int):
    for u in usuarios_db:
        if u.id == usuario_id:
            return u
    raise HTTPException(status_code=404, detail="Usuário não encontrado")

@app.put("/usuarios/{usuario_id}", response_model=Usuario)
def update_usuario(usuario_id: int, usuario: Usuario):
    for idx, u in enumerate(usuarios_db):
        if u.id == usuario_id:
            usuario.id = usuario_id
            usuarios_db[idx] = usuario
            return usuario
    raise HTTPException(status_code=404, detail="Usuário não encontrado")

@app.delete("/usuarios/{usuario_id}")
def delete_usuario(usuario_id: int):
    for idx, u in enumerate(usuarios_db):
        if u.id == usuario_id:
            del usuarios_db[idx]
            return {"detail": "Usuário deletado"}
    raise HTTPException(status_code=404, detail="Usuário não encontrado")

# Endpoints Registros de Preços
@app.post("/registros_precos", response_model=RegistroPreco)
def create_registro_preco(registro: RegistroPreco):
    registro.id = get_next_id(registros_precos_db)
    registros_precos_db.append(registro)
    return registro

@app.get("/registros_precos", response_model=List[RegistroPreco])
def list_registros_precos():
    return registros_precos_db

@app.get("/registros_precos/{registro_id}", response_model=RegistroPreco)
def get_registro_preco(registro_id: int):
    for r in registros_precos_db:
        if r.id == registro_id:
            return r
    raise HTTPException(status_code=404, detail="Registro não encontrado")

@app.put("/registros_precos/{registro_id}", response_model=RegistroPreco)
def update_registro_preco(registro_id: int, registro: RegistroPreco):
    for idx, r in enumerate(registros_precos_db):
        if r.id == registro_id:
            registro.id = registro_id
            registros_precos_db[idx] = registro
            return registro
    raise HTTPException(status_code=404, detail="Registro não encontrado")

@app.delete("/registros_precos/{registro_id}")
def delete_registro_preco(registro_id: int):
    for idx, r in enumerate(registros_precos_db):
        if r.id == registro_id:
            del registros_precos_db[idx]
            return {"detail": "Registro deletado"}
    raise HTTPException(status_code=404, detail="Registro não encontrado")
