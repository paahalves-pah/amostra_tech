from sqlalchemy import Column
from sqlalchemy import Integer
from sqlalchemy import String
from sqlalchemy import Date
from sqlalchemy import TIMESTAMP

from sqlalchemy.sql import func

from app.database.database import Base


class Paciente(Base):

    __tablename__ = "pacientes"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    nome = Column(
        String(150),
        nullable=False
    )

    data_nascimento = Column(
        Date,
        nullable=False
    )

    prontuario = Column(
        String(50)
    )

    sexo = Column(
        String(20)
    )

    medico_solicitante = Column(
        String(150)
    )

    created_at = Column(
        TIMESTAMP,
        server_default=func.now()
    )