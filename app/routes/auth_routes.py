from fastapi import APIRouter
from fastapi import Depends
from fastapi import HTTPException

from sqlalchemy.orm import Session

from app.database.database import get_db

from app.models.usuario_model import Usuario

from app.schemas.usuario_schema import (
    UsuarioLogin
)

from app.auth.auth_bearer import (
    get_current_user
)

from app.auth.security import (
    verificar_senha,
    gerar_hash_senha
)

from app.auth.jwt_handler import criar_token


router = APIRouter(
    prefix="/auth",
    tags=["Auth"]
)


# LOGIN
@router.post("/login")
def login(
    dados: UsuarioLogin,
    db: Session = Depends(get_db)
):

    usuario = db.query(Usuario).filter(
        Usuario.email == dados.email
    ).first()

    if not usuario:

        raise HTTPException(
            status_code=401,
            detail="Credenciais inválidas"
        )

    senha_valida = verificar_senha(
        dados.senha,
        usuario.senha
    )

    if not senha_valida:

        raise HTTPException(
            status_code=401,
            detail="Credenciais inválidas"
        )

    token = criar_token({

        "id": usuario.id,

        "email": usuario.email,

        "tipo_usuario": usuario.tipo_usuario

    })

    return {

        "access_token": token,

        "token_type": "bearer",

        "user": {

            "id": usuario.id,

            "nome": usuario.nome,

            "email": usuario.email,

            "tipo_usuario": usuario.tipo_usuario,

            "first_access": usuario.first_access,

            "foto_perfil": usuario.foto_perfil

        }

    }


# ALTERAR SENHA
@router.put("/change-password")
def alterar_senha(

    dados: dict,

    usuario_logado = Depends(
        get_current_user
    ),

    db: Session = Depends(get_db)

):

    usuario = db.query(Usuario).filter(
        Usuario.id == usuario_logado.id
    ).first()

    if not usuario:

        raise HTTPException(
            status_code=404,
            detail="Usuário não encontrado"
        )

    senha_valida = verificar_senha(
        dados["senha_atual"],
        usuario.senha
    )

    if not senha_valida:

        raise HTTPException(
            status_code=400,
            detail="Senha atual inválida"
        )

    usuario.senha = gerar_hash_senha(
        dados["nova_senha"]
    )

    usuario.first_access = False

    db.commit()

    return {
        "message":
        "Senha alterada com sucesso"
    }