from sqlalchemy import Column
from sqlalchemy import Integer
from sqlalchemy import String
from sqlalchemy import Text
from sqlalchemy import ForeignKey
from sqlalchemy import TIMESTAMP

from sqlalchemy.sql import func

from app.database.database import Base


class ResultadoExame(Base):

    __tablename__ = "resultados_exames"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    coleta_id = Column(
        Integer,
        ForeignKey("coletas.id")
    )

    exame_id = Column(
        Integer,
        ForeignKey("exames.id")
    )

    resultado = Column(Text)

    status = Column(
        String(50),
        default="PENDENTE"
    )

    observacao_tecnica = Column(Text)

    # NOVA COLUNA
    arquivo = Column(
        String(255),
        nullable=True
    )

    created_at = Column(
        TIMESTAMP,
        server_default=func.now()
    )

