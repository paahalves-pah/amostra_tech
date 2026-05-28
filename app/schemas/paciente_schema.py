from pydantic import BaseModel
from datetime import date
from datetime import datetime
from typing import Optional


# BASE
class PacienteBase(BaseModel):

    nome: str

    data_nascimento: date

    prontuario: Optional[str] = None

    sexo: Optional[str] = None

    medico_solicitante: Optional[str] = None


# CRIAR
class PacienteCreate(PacienteBase):
    pass


# RESPOSTA
class PacienteResponse(PacienteBase):

    id: int

    created_at: datetime

    class Config:
        from_attributes = True