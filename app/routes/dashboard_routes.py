from fastapi import APIRouter
from fastapi import Depends
from fastapi import HTTPException
from fastapi import UploadFile
from fastapi import File

from sqlalchemy.orm import Session

from app.database.database import get_db

from app.models.usuario_model import Usuario

from app.schemas.usuario_schema import (
    UsuarioCreate,
    UsuarioLogin
)

from app.auth.security import (
    gerar_hash_senha,
    verificar_senha
)

from app.auth.jwt_handler import criar_token

from app.auth.dependencies import (
    verificar_usuario_logado
)

import shutil


router = APIRouter(
    prefix="/auth",
    tags=["Auth"]
)


# ALTERAR PERFIL USER/ADMIN
@router.put("/change-role/{user_id}")
def alterar_perfil(

    user_id: int,

    usuario_logado: dict = Depends(
        verificar_usuario_logado
    ),

    db: Session = Depends(get_db)

):

    usuario = db.query(Usuario).filter(
        Usuario.id == user_id
    ).first()

    if not usuario:

        raise HTTPException(
            status_code=404,
            detail="Usuário não encontrado"
        )

    if usuario.tipo_usuario == "ADMIN":

        usuario.tipo_usuario = "USER"

    else:

        usuario.tipo_usuario = "ADMIN"

    db.commit()

    return {
        "message": "Perfil alterado",
        "novo_perfil": usuario.tipo_usuario
    }


# ATIVAR/DESATIVAR USUÁRIO
@router.put("/toggle-user/{user_id}")
def toggle_usuario(

    user_id: int,

    usuario_logado: dict = Depends(
        verificar_usuario_logado
    ),

    db: Session = Depends(get_db)

):

    usuario = db.query(Usuario).filter(
        Usuario.id == user_id
    ).first()

    if not usuario:

        raise HTTPException(
            status_code=404,
            detail="Usuário não encontrado"
        )

    usuario.ativo = not usuario.ativo

    db.commit()

    return {
        "message": "Status alterado",
        "ativo": usuario.ativo
    }


# UPLOAD FOTO PERFIL
@router.post("/upload-photo")
def upload_foto(

    foto: UploadFile = File(...),

    usuario_logado: dict = Depends(
        verificar_usuario_logado
    ),

    db: Session = Depends(get_db)

):

    usuario = db.query(Usuario).filter(
        Usuario.email == usuario_logado["email"]
    ).first()

    if not usuario:

        raise HTTPException(
            status_code=404,
            detail="Usuário não encontrado"
        )

    caminho_arquivo = (
        f"uploads/{usuario.id}_{foto.filename}"
    )

    with open(caminho_arquivo, "wb") as buffer:

        shutil.copyfileobj(
            foto.file,
            buffer
        )

    usuario.foto_perfil = caminho_arquivo

    db.commit()

    return {
        "message": "Foto enviada",
        "foto_perfil": caminho_arquivo
    }


# LISTAR USUÁRIOS
@router.get("/users")
def listar_usuarios(

    usuario_logado: dict = Depends(
        verificar_usuario_logado
    ),

    db: Session = Depends(get_db)

):

    usuarios = db.query(Usuario).all()

    return usuarios


# RESETAR SENHA
@router.put("/reset-password/{user_id}")
def resetar_senha(

    user_id: int,

    usuario_logado: dict = Depends(
        verificar_usuario_logado
    ),

    db: Session = Depends(get_db)

):

    usuario = db.query(Usuario).filter(
        Usuario.id == user_id
    ).first()

    if not usuario:

        raise HTTPException(
            status_code=404,
            detail="Usuário não encontrado"
        )

    senha_temporaria = "123456"

    usuario.senha = gerar_hash_senha(
        senha_temporaria
    )

    usuario.first_access = True

    db.commit()

    return {
        "message": "Senha resetada",
        "senha_temporaria": senha_temporaria
    }


# ALTERAR SENHA
@router.put("/change-password")
def alterar_senha(

    dados: dict,

    usuario_logado: dict = Depends(
        verificar_usuario_logado
    ),

    db: Session = Depends(get_db)

):

    usuario = db.query(Usuario).filter(
        Usuario.email == usuario_logado["email"]
    ).first()

    if not usuario:

        raise HTTPException(
            status_code=404,
            detail="Usuário não encontrado"
        )

    senha_atual_valida = verificar_senha(
        dados["senha_atual"],
        usuario.senha
    )

    if not senha_atual_valida:

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
        "message": "Senha alterada com sucesso"
    }


# DELETAR USUÁRIO
@router.delete("/users/{user_id}")
def deletar_usuario(

    user_id: int,

    usuario_logado: dict = Depends(
        verificar_usuario_logado
    ),

    db: Session = Depends(get_db)

):

    usuario = db.query(Usuario).filter(
        Usuario.id == user_id
    ).first()

    if not usuario:

        raise HTTPException(
            status_code=404,
            detail="Usuário não encontrado"
        )

    db.delete(usuario)

    db.commit()

    return {
        "message": "Usuário deletado"
    }


# CADASTRAR USUÁRIO
@router.post("/register")
def register_user(
    usuario: UsuarioCreate,
    db: Session = Depends(get_db)
):

    usuario_existente = db.query(Usuario).filter(
        Usuario.email == usuario.email
    ).first()

    if usuario_existente:

        raise HTTPException(
            status_code=400,
            detail="E-mail já cadastrado"
        )

    novo_usuario = Usuario(

        nome=usuario.nome,

        email=usuario.email,

        senha=gerar_hash_senha(usuario.senha),

        telefone=usuario.telefone,

        matricula=usuario.matricula,

        cargo=usuario.cargo,

        unidade=usuario.unidade,

        tipo_usuario=usuario.tipo_usuario

    )

    db.add(novo_usuario)

    db.commit()

    db.refresh(novo_usuario)

    return {
        "message": "Usuário criado com sucesso"
    }


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

    if not usuario.ativo:

        raise HTTPException(
            status_code=403,
            detail="Usuário desativado"
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

        "message": "Login realizado",

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