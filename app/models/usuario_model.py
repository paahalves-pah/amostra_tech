from sqlalchemy import Boolean
from sqlalchemy import Column
from sqlalchemy import Integer
from sqlalchemy import String
from sqlalchemy import TIMESTAMP

from sqlalchemy.sql import func

from app.database.database import Base


class Usuario(Base):

    __tablename__ = "usuarios"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    nome = Column(
        String(100),
        nullable=False
    )

    email = Column(
        String(150),
        unique=True,
        nullable=False
    )

    senha = Column(
        String(255),
        nullable=False
    )

    telefone = Column(
        String(20)
    )

    matricula = Column(
        String(50)
    )

    cargo = Column(
        String(50)
    )

    unidade = Column(
        String(100)
    )

    foto_perfil = Column(
        String(255)
    )

    data_nascimento = Column(
        String(20)
    )

    tipo_usuario = Column(
        String(20),
        default="USER"
    )

    first_access = Column(
        Boolean,
        default=True
    )

    ativo = Column(
        Boolean,
        default=True
    )

    created_at = Column(
        TIMESTAMP,
        server_default=func.now()
    )