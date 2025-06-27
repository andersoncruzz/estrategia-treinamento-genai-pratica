from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.models import models
from app.db import engine
from app.routes import posto, combustivel, condutor, abastecimento

models.Base.metadata.create_all(bind=engine)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Ou especifique os domínios permitidos
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(posto.router)
app.include_router(combustivel.router)
app.include_router(condutor.router)
app.include_router(abastecimento.router)
