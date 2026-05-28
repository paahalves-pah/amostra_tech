from sqlalchemy import Column
from sqlalchemy import Integer
from sqlalchemy import String
from sqlalchemy import TIMESTAMP
from sqlalchemy import ForeignKey

from sqlalchemy.sql import func

from app.database.database import Base


class LogSistema(Base):

    __tablename__ = "logs_sistema"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    usuario_id = Column(
        Integer,
        ForeignKey("usuarios.id")
    )

    acao = Column(
        String(50)
    )

    entidade = Column(
        String(100)
    )

    registro_id = Column(
        Integer
    )

    created_at = Column(
        TIMESTAMP,
        server_default=func.now()
    )