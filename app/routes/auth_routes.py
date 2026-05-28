from fastapi import APIRouter
from fastapi import Depends
from fastapi import HTTPException

from sqlalchemy.orm import Session

from app.database.database import get_db

from app.models.usuario_model import Usuario

from app.schemas.usuario_schema import (
    UsuarioLogin
)

from app.auth.security import (
    verificar_senha
)

from app.auth.jwt_handler import criar_token