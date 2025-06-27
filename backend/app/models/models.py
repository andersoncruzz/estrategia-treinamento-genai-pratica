from sqlalchemy import Column, Integer, String, Float, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from app.db import Base

class Posto(Base):
    __tablename__ = "postos"
    id = Column(Integer, primary_key=True, index=True)
    nome = Column(String, nullable=False)
    endereco = Column(String, nullable=False)
    bandeira = Column(String, nullable=True)
    cnpj = Column(String, nullable=True)
    abastecimentos = relationship("Abastecimento", back_populates="posto")

class Combustivel(Base):
    __tablename__ = "combustiveis"
    id = Column(Integer, primary_key=True, index=True)
    tipo = Column(String, nullable=False)
    preco = Column(Float, nullable=False)
    unidade = Column(String, default="litro")
    abastecimentos = relationship("Abastecimento", back_populates="combustivel")

class Condutor(Base):
    __tablename__ = "condutores"
    id = Column(Integer, primary_key=True, index=True)
    nome = Column(String, nullable=False)
    cpf = Column(String, nullable=True)
    veiculo = Column(String, nullable=True)
    abastecimentos = relationship("Abastecimento", back_populates="condutor")

class Abastecimento(Base):
    __tablename__ = "abastecimentos"
    id = Column(Integer, primary_key=True, index=True)
    posto_id = Column(Integer, ForeignKey("postos.id"))
    condutor_id = Column(Integer, ForeignKey("condutores.id"))
    combustivel_id = Column(Integer, ForeignKey("combustiveis.id"))
    data = Column(DateTime, nullable=False)
    quantidade = Column(Float, nullable=False)
    valor_total = Column(Float, nullable=False)
    posto = relationship("Posto", back_populates="abastecimentos")
    condutor = relationship("Condutor", back_populates="abastecimentos")
    combustivel = relationship("Combustivel", back_populates="abastecimentos")
