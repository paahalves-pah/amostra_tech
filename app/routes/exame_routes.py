from fastapi import APIRouter
from fastapi import Depends
from fastapi import HTTPException

from sqlalchemy.orm import Session

from app.database.database import get_db

from app.models.exame_model import Exame

from app.schemas.exame_schema import (
    ExameCreate,
    ExameUpdate
)

from app.auth.dependencies import (
    verificar_usuario_logado
)

from datetime import datetime

import random


router = APIRouter(

    prefix="/exams",

    tags=["Exames"]

)


def gerar_protocolo():

    numero = random.randint(
        1000,
        9999
    )

    data = datetime.now().strftime(
        "%Y%m%d"
    )

    return f"COL-{data}-{numero}"


def gerar_prontuario():

    numero = random.randint(
        10000,
        99999
    )

    return f"PRONT-{numero}"


@router.get("/")
def listar_exames(

    usuario_logado: dict = Depends(
        verificar_usuario_logado
    ),

    db: Session = Depends(get_db)

):

    exames = db.query(Exame).all()

    return exames


@router.post("/")
def criar_exame(

    exame: ExameCreate,

    usuario_logado: dict = Depends(
        verificar_usuario_logado
    ),

    db: Session = Depends(get_db)

):

    protocolo = gerar_protocolo()

    paciente_existente = db.query(Exame).filter(
        Exame.cpf == exame.cpf
    ).first()

    if paciente_existente:

        prontuario = paciente_existente.prontuario

    else:

        prontuario = gerar_prontuario()

    novo_exame = Exame(

        paciente=exame.paciente,

        cpf=exame.cpf,

        data_nascimento=exame.data_nascimento,

        telefone=exame.telefone,

        prontuario=prontuario,

        protocolo=protocolo,

        tipo_exame=exame.tipo_exame,

        prioridade=exame.prioridade,

        responsavel=exame.responsavel,

        observacoes=exame.observacoes,

        data_coleta=exame.data_coleta

    )

    db.add(novo_exame)

    db.commit()

    db.refresh(novo_exame)

    return {

        "message": "Coleta criada",

        "protocolo": protocolo,

        "prontuario": prontuario

    }


@router.put("/{exam_id}")
def editar_exame(

    exam_id: int,

    dados: ExameUpdate,

    usuario_logado: dict = Depends(
        verificar_usuario_logado
    ),

    db: Session = Depends(get_db)

):

    exame = db.query(Exame).filter(
        Exame.id == exam_id
    ).first()

    if not exame:

        raise HTTPException(
            status_code=404,
            detail="Exame não encontrado"
        )

    exame.paciente = dados.paciente
    exame.cpf = dados.cpf
    exame.data_nascimento = dados.data_nascimento
    exame.telefone = dados.telefone
    exame.tipo_exame = dados.tipo_exame
    exame.status = dados.status
    exame.prioridade = dados.prioridade
    exame.responsavel = dados.responsavel
    exame.observacoes = dados.observacoes
    exame.data_coleta = dados.data_coleta

    db.commit()

    return {
        "message": "Exame atualizado"
    }


@router.delete("/{exam_id}")
def deletar_exame(

    exam_id: int,

    usuario_logado: dict = Depends(
        verificar_usuario_logado
    ),

    db: Session = Depends(get_db)

):

    exame = db.query(Exame).filter(
        Exame.id == exam_id
    ).first()

    if not exame:

        raise HTTPException(
            status_code=404,
            detail="Exame não encontrado"
        )

    db.delete(exame)

    db.commit()

    return {
        "message": "Exame deletado"
    }