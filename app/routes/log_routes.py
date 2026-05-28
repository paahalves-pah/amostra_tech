from fastapi import APIRouter
from fastapi import Depends
from fastapi import HTTPException

from sqlalchemy.orm import Session

from app.database.database import get_db

from app.auth.auth_bearer import get_current_user

from app.models.log_model import LogSistema

from app.schemas.log_schema import (
    LogResponse
)


router = APIRouter(
    prefix="/logs",
    tags=["Logs"]
)


# LISTAR LOGS
@router.get(
    "/",
    response_model=list[LogResponse]
)
def listar_logs(
    db: Session = Depends(get_db),
    usuario = Depends(get_current_user)
):

    # SOMENTE ADMIN
    if usuario.role != "ADMIN":

        raise HTTPException(
            status_code=403,
            detail="Acesso negado"
        )

    logs = db.query(
        LogSistema
    ).order_by(
        LogSistema.created_at.desc()
    ).all()

    return logs

# FILTRAR LOGS POR AÇÃO
@router.get(
    "/acao/{acao}",
    response_model=list[LogResponse]
)
def filtrar_logs_acao(

    acao: str,
    db: Session = Depends(get_db),
    usuario = Depends(get_current_user)
):

    if usuario.role != "ADMIN":

        raise HTTPException(
            status_code=403,
            detail="Acesso negado"
        )

    logs = db.query(
        LogSistema
    ).filter(
        LogSistema.acao == acao.upper()
    ).all()

    return logs

# FILTRAR LOGS POR USUÁRIO
@router.get(
    "/usuario/{usuario_id}",
    response_model=list[LogResponse]
)
def filtrar_logs_usuario(
    usuario_id: int,
    db: Session = Depends(get_db),
    usuario = Depends(get_current_user)
):

    # SOMENTE ADMIN
    if usuario.role != "ADMIN":

        raise HTTPException(
            status_code=403,
            detail="Acesso negado"
        )

    logs = db.query(
        LogSistema
    ).filter(
        LogSistema.usuario_id == usuario_id
    ).order_by(
        LogSistema.created_at.desc()
    ).all()

    return logs
