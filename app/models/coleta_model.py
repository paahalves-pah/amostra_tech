from sqlalchemy import Column
from sqlalchemy import Integer
from sqlalchemy import String
from sqlalchemy import Date
from sqlalchemy import Time
from sqlalchemy import Text
from sqlalchemy import ForeignKey
from sqlalchemy import TIMESTAMP

from sqlalchemy.orm import relationship

from sqlalchemy.sql import func

from app.database.database import Base


class Coleta(Base):

    __tablename__ = "coletas"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    paciente_id = Column(
        Integer,
        ForeignKey("pacientes.id")
    )

    usuario_id = Column(
        Integer,
        ForeignKey("usuarios.id")
    )

    data_coleta = Column(
        Date,
        nullable=False
    )

    hora_coleta = Column(
        Time,
        nullable=False
    )

    setor = Column(
        String(100)
    )

    observacoes = Column(Text)

    created_at = Column(
        TIMESTAMP,
        server_default=func.now()
    )

    # RELACIONAMENTOS
    paciente = relationship("Paciente")

    usuario = relationship("Usuario")