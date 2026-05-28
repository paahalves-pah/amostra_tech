from fastapi import APIRouter
from fastapi import Depends
from fastapi import HTTPException

from sqlalchemy.orm import Session

from app.database.database import get_db
from app.utils.logs import registrar_log

from app.auth.auth_bearer import get_current_user

from app.models.resultado_model import (
    ResultadoExame
)

from app.models.coleta_model import Coleta

from app.models.exame_model import Exame

from app.schemas.resultado_schema import (
    ResultadoCreate,
    ResultadoResponse
)


router = APIRouter(
    prefix="/resultados",
    tags=["Resultados"]
)


# CRIAR RESULTADO
@router.post(
    "/",
    response_model=ResultadoResponse
)
def criar_resultado(
    resultado: ResultadoCreate,
    db: Session = Depends(get_db),
    usuario = Depends(get_current_user)
):

    # VERIFICA COLETA
    coleta = db.query(Coleta).filter(
        Coleta.id == resultado.coleta_id
    ).first()

    if not coleta:

        raise HTTPException(
            status_code=404,
            detail="Coleta não encontrada"
        )

    # VERIFICA EXAME
    exame = db.query(Exame).filter(
        Exame.id == resultado.exame_id
    ).first()

    if not exame:

        raise HTTPException(
            status_code=404,
            detail="Exame não encontrado"
        )

    novo_resultado = ResultadoExame(
        coleta_id=resultado.coleta_id,

        exame_id=resultado.exame_id,

        resultado=resultado.resultado,

        status=resultado.status,

        observacao_tecnica=resultado.observacao_tecnica
    )

    db.add(novo_resultado)

    db.commit()

    db.refresh(novo_resultado)

    registrar_log(
    db=db,
    usuario_id=usuario.id,
    acao="CREATE",
    entidade="RESULTADO",
    registro_id=novo_resultado.id
)

    return novo_resultado


# LISTAR RESULTADOS
@router.get(
    "/",
    response_model=list[ResultadoResponse]
)
def listar_resultados(
    skip: int = 0,
    limit: int = 10,
    db: Session = Depends(get_db),
    usuario = Depends(get_current_user)
):
    if limit < 1:
        limit = 10

    if limit > 100:
        limit = 100

    resultados = db.query(
        ResultadoExame
    ).all()

    return resultados


# BUSCAR RESULTADOS POR COLETA
@router.get(
    "/coleta/{coleta_id}",
    response_model=list[ResultadoResponse]
)
def buscar_resultados_coleta(
    coleta_id: int,
    db: Session = Depends(get_db),
    usuario = Depends(get_current_user)
):

    resultados = db.query(
        ResultadoExame
    ).filter(
        ResultadoExame.coleta_id == coleta_id
    ).all()

    return resultados

# BUSCAR RESULTADOS POR TEXTO
@router.get(
    "/busca/{texto}",
    response_model=list[ResultadoResponse]
)
def buscar_resultados_texto(
    texto: str,
    db: Session = Depends(get_db),
    usuario = Depends(get_current_user)
):

    resultados = db.query(
        ResultadoExame
    ).filter(
        ResultadoExame.resultado.ilike(
            f"%{texto}%"
        )
    ).all()

    return resultados

# BUSCAR RESULTADOS POR STATUS
@router.get(
    "/status/{status}",
    response_model=list[ResultadoResponse]
)
def buscar_por_status(
    status: str,
    db: Session = Depends(get_db),
    usuario = Depends(get_current_user)
):

    resultados = db.query(
        ResultadoExame
    ).filter(
        ResultadoExame.status == status.upper()
    ).all()

    return resultados

# EDITAR RESULTADO
@router.put(
    "/{resultado_id}",
    response_model=ResultadoResponse
)
def editar_resultado(
    resultado_id: int,
    dados: ResultadoCreate,
    db: Session = Depends(get_db),
    usuario = Depends(get_current_user)
):

    resultado = db.query(
        ResultadoExame
    ).filter(
        ResultadoExame.id == resultado_id
    ).first()
    
    if not resultado:

        raise HTTPException(
            status_code=404,
            detail="Resultado não encontrado"
        )
        coleta = db.query(Coleta).filter(
        Coleta.id == resultado.coleta_id
    ).first()

    # PERMISSÃO
    if (
        usuario.role != "ADMIN"
        and coleta.usuario_id != usuario.id
    ):

        raise HTTPException(
            status_code=403,
            detail="Sem permissão"
        )
    # VALIDA COLETA
    coleta = db.query(Coleta).filter(
        Coleta.id == dados.coleta_id
    ).first()

    if not coleta:

        raise HTTPException(
            status_code=404,
            detail="Coleta não encontrada"
        )

    # VALIDA EXAME
    exame = db.query(Exame).filter(
        Exame.id == dados.exame_id
    ).first()

    if not exame:

        raise HTTPException(
            status_code=404,
            detail="Exame não encontrado"
        )

    resultado.coleta_id = dados.coleta_id

    resultado.exame_id = dados.exame_id

    resultado.resultado = dados.resultado

    resultado.status = dados.status

    resultado.observacao_tecnica = (
        dados.observacao_tecnica
    )

    db.commit()

    db.refresh(resultado)

    registrar_log(
    db=db,
    usuario_id=usuario.id,
    acao="UPDATE",
    entidade="RESULTADO",
    registro_id=resultado.id
)
    return resultado

# DELETAR RESULTADO
@router.delete("/{resultado_id}")
def deletar_resultado(
    resultado_id: int,
    db: Session = Depends(get_db),
    usuario = Depends(get_current_user)
):

    resultado = db.query(
        ResultadoExame
    ).filter(
        ResultadoExame.id == resultado_id
    ).first()
    coleta = db.query(Coleta).filter(
    Coleta.id == resultado.coleta_id
).first()

    if not resultado:

        raise HTTPException(
            status_code=404,
            detail="Resultado não encontrado"
        )
    
        coleta = db.query(Coleta).filter(
        Coleta.id == resultado.coleta_id
    ).first()

    # PERMISSÃO
    if (
        usuario.role != "ADMIN"
        and coleta.usuario_id != usuario.id
    ):

        raise HTTPException(
            status_code=403,
            detail="Sem permissão"
        )

    db.delete(resultado)

    db.commit()

    registrar_log(
    db=db,
    usuario_id=usuario.id,
    acao="DELETE",
    entidade="RESULTADO",
    registro_id=resultado.id
)

    return {
        "mensagem": "Resultado deletado com sucesso"
    }