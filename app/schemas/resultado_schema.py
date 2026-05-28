from pydantic import BaseModel

from typing import Optional

from datetime import datetime


class ResultadoCreate(BaseModel):

    coleta_id: int

    exame_id: int

    resultado: str

    status: Optional[str] = "FINALIZADO"

    observacao_tecnica: Optional[str] = None


class ResultadoResponse(BaseModel):

    id: int

    coleta_id: int

    exame_id: int

    resultado: str

    status: str

    observacao_tecnica: Optional[str]

    created_at: datetime

    class Config:
        from_attributes = True