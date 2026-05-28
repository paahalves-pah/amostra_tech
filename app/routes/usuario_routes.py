from fastapi import APIRouter
from fastapi import Depends
from fastapi import HTTPException

from app.auth.auth_bearer import get_current_user
from app.auth.permissions import admin_required

from sqlalchemy.orm import Session

from app.database.database import get_db

from app.models.usuario_model import Usuario

from app.schemas.usuario_schema import (
    UsuarioCreate,
    UsuarioUpdate,
    UsuarioResponse
)

from app.schemas.reset_senha_schema import (
    ResetSenha
)

from app.auth.security import (
    gerar_hash_senha
)


router = APIRouter(
    prefix="/users",
    tags=["Usuários"]
)


# CRIAR USUÁRIO
@router.post(
    "/",
    response_model=UsuarioResponse
)
def criar_usuario(
    usuario: UsuarioCreate,
    db: Session = Depends(get_db),
    admin = Depends(admin_required)
):

    usuario_existente = db.query(
        Usuario
    ).filter(
        Usuario.email == usuario.email
    ).first()

    if usuario_existente:

        raise HTTPException(
            status_code=400,
            detail="Email já cadastrado"
        )

    senha_hash = gerar_hash_senha(
        usuario.senha
    )

    novo_usuario = Usuario(

        nome=usuario.nome,

        email=usuario.email,

        senha=senha_hash,

        telefone=usuario.telefone,

        matricula=usuario.matricula,

        cargo=usuario.cargo,

        unidade=usuario.unidade,

        foto_perfil=usuario.foto_perfil,

        tipo_usuario=usuario.tipo_usuario

    )

    db.add(novo_usuario)

    db.commit()

    db.refresh(novo_usuario)

    return novo_usuario


# LISTAR USUÁRIOS
@router.get(
    "/",
    response_model=list[UsuarioResponse]
)
def listar_usuarios(
    db: Session = Depends(get_db),
    usuario = Depends(get_current_user)
):

    usuarios = db.query(
        Usuario
    ).all()

    return usuarios


# ATUALIZAR USUÁRIO
@router.put(
    "/{usuario_id}"
)
def atualizar_usuario(
    usuario_id: int,
    dados: UsuarioUpdate,
    db: Session = Depends(get_db),
    usuario = Depends(get_current_user)
):

    usuario_db = db.query(
        Usuario
    ).filter(
        Usuario.id == usuario_id
    ).first()

    if not usuario_db:

        raise HTTPException(
            status_code=404,
            detail="Usuário não encontrado"
        )

    usuario_db.nome = dados.nome

    usuario_db.email = dados.email

    usuario_db.telefone = dados.telefone

    usuario_db.matricula = dados.matricula

    usuario_db.cargo = dados.cargo

    usuario_db.unidade = dados.unidade

    usuario_db.tipo_usuario = dados.tipo_usuario

    usuario_db.foto_perfil = dados.foto_perfil

    db.commit()

    db.refresh(usuario_db)

    return usuario_db


# EXCLUIR USUÁRIO
@router.delete(
    "/{usuario_id}"
)
def deletar_usuario(
    usuario_id: int,
    db: Session = Depends(get_db),
    admin = Depends(admin_required)
):

    usuario = db.query(
        Usuario
    ).filter(
        Usuario.id == usuario_id
    ).first()

    if not usuario:

        raise HTTPException(
            status_code=404,
            detail="Usuário não encontrado"
        )

    db.delete(usuario)

    db.commit()

    return {
        "message":
        "Usuário excluído"
    }


# RESETAR SENHA
@router.put("/resetar-senha/{usuario_id}")
def resetar_senha(
    usuario_id: int,
    dados: ResetSenha,
    db: Session = Depends(get_db),
    usuario = Depends(get_current_user)
):

    usuario_reset = db.query(
        Usuario
    ).filter(
        Usuario.id == usuario_id
    ).first()

    if not usuario_reset:

        raise HTTPException(
            status_code=404,
            detail="Usuário não encontrado"
        )

    usuario_reset.senha = gerar_hash_senha(
        dados.nova_senha
    )

    db.commit()

    return {
        "message":
        "Senha redefinida com sucesso"
    }