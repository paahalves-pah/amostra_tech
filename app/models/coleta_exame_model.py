from sqlalchemy import Column
from sqlalchemy import Integer
from sqlalchemy import ForeignKey

from app.database.database import Base


class ColetaExame(Base):

    __tablename__ = "coleta_exames"

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