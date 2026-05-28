from pydantic import BaseModel

from datetime import datetime


class LogResponse(BaseModel):

    id: int

    usuario_id: int

    acao: str

    entidade: str

    registro_id: int

    created_at: datetime

    class Config:
        from_attributes = True