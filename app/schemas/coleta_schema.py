from pydantic import BaseModel

from datetime import date
from datetime import time
from datetime import datetime

from typing import Optional


# CRIAR COLETA
class ColetaCreate(BaseModel):

    paciente_id: int

    exames_ids: list[int]

    data_coleta: date

    hora_coleta: time

    setor: Optional[str] = None

    observacoes: Optional[str] = None


class PacienteResumo(BaseModel):

    id: int

    nome: str

    class Config:
        from_attributes = True


class UsuarioResumo(BaseModel):

    id: int

    nome: str

    email: str

    class Config:
        from_attributes = True

# RESPOSTA
class ColetaResponse(BaseModel):

    id: int

    data_coleta: date

    hora_coleta: time

    setor: Optional[str]

    observacoes: Optional[str]

    created_at: datetime

    paciente: PacienteResumo

    usuario: UsuarioResumo

    class Config:
        from_attributes = True