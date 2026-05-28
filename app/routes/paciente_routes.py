from fastapi import APIRouter
from fastapi import Depends
from fastapi import HTTPException

from sqlalchemy.orm import Session

from app.database.database import get_db

from app.models.paciente_model import Paciente

from app.schemas.paciente_schema import (
    PacienteCreate,
    PacienteResponse
)

from app.auth.auth_bearer import get_current_user


router = APIRouter(
    prefix="/pacientes",
    tags=["Pacientes"]
)


# CRIAR PACIENTE
@router.post(
    "/",
    response_model=PacienteResponse
)
def criar_paciente(
    paciente: PacienteCreate,
    db: Session = Depends(get_db),
    usuario = Depends(get_current_user)
):

    novo_paciente = Paciente(
        nome=paciente.nome,
        data_nascimento=paciente.data_nascimento,
        prontuario=paciente.prontuario,
        sexo=paciente.sexo,
        medico_solicitante=paciente.medico_solicitante
    )

    db.add(novo_paciente)

    db.commit()

    db.refresh(novo_paciente)

    return novo_paciente


# LISTAR PACIENTES
@router.get(
    "/",
    response_model=list[PacienteResponse]
)
def listar_pacientes(
    skip: int = 0,
    limit: int = 10,
    db: Session = Depends(get_db)
):
    if limit < 1:
        limit = 10

    if limit > 100:
        limit = 100

    db.query(
    Paciente
    ).offset(
    skip
    ).limit(
    limit
    ).all()

    return Paciente

# BUSCAR PACIENTE POR ID
@router.get(
    "/{paciente_id}",
    response_model=PacienteResponse
)
def buscar_paciente(
    paciente_id: int,
    db: Session = Depends(get_db),
    usuario = Depends(get_current_user)
):

    paciente = db.query(Paciente).filter(
        Paciente.id == paciente_id
    ).first()

    if not paciente:

        raise HTTPException(
            status_code=404,
            detail="Paciente não encontrado"
        )

    return paciente

# ATUALIZAR PACIENTE
@router.put(
    "/{paciente_id}",
    response_model=PacienteResponse
)
def atualizar_paciente(
    paciente_id: int,
    paciente_atualizado: PacienteCreate,
    db: Session = Depends(get_db),
    usuario = Depends(get_current_user)
):

    paciente = db.query(Paciente).filter(
        Paciente.id == paciente_id
    ).first()

    if not paciente:

        raise HTTPException(
            status_code=404,
            detail="Paciente não encontrado"
        )

    paciente.nome = paciente_atualizado.nome

    paciente.data_nascimento = (
        paciente_atualizado.data_nascimento
    )

    paciente.prontuario = (
        paciente_atualizado.prontuario
    )

    paciente.sexo = paciente_atualizado.sexo

    paciente.medico_solicitante = (
        paciente_atualizado.medico_solicitante
    )

    db.commit()

    db.refresh(paciente)

    return paciente

# DELETAR PACIENTE
@router.delete("/{paciente_id}")
def deletar_paciente(
    paciente_id: int,
    db: Session = Depends(get_db),
    usuario = Depends(get_current_user)
):

    paciente = db.query(Paciente).filter(
        Paciente.id == paciente_id
    ).first()

    if not paciente:

        raise HTTPException(
            status_code=404,
            detail="Paciente não encontrado"
        )

    db.delete(paciente)

    db.commit()

    return {
        "mensagem": "Paciente deletado com sucesso"
    }