from sqlalchemy import Column
from sqlalchemy import Integer
from sqlalchemy import String
from sqlalchemy import TIMESTAMP

from sqlalchemy.sql import func

from app.database.database import Base


class Exame(Base):

    __tablename__ = "exames"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    paciente = Column(
        String(150),
        nullable=False
    )

    cpf = Column(
        String(20),
        nullable=False
    )

    data_nascimento = Column(
        String(20)
    )

    telefone = Column(
        String(20)
    )

    prontuario = Column(
        String(100),
        nullable=False
    )

    protocolo = Column(
        String(100),
        unique=True,
        nullable=False
    )

    tipo_exame = Column(
        String(1000),
        nullable=False
    )

    status = Column(
        String(50),
        default="PENDENTE"
    )

    prioridade = Column(
        String(50),
        default="NORMAL"
    )

    responsavel = Column(
        String(100)
    )

    observacoes = Column(
        String(500)
    )

    data_coleta = Column(
        String(50)
    )

    created_at = Column(
        TIMESTAMP,
        server_default=func.now()
    )