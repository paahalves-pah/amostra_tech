from fastapi import Depends
from fastapi import HTTPException

from fastapi.security import OAuth2PasswordBearer

from jose import jwt
from jose import JWTError

from sqlalchemy.orm import Session

from app.database.database import get_db

from app.models.usuario_model import Usuario


SECRET_KEY = "amostratech_secret"

ALGORITHM = "HS256"


oauth2_scheme = OAuth2PasswordBearer(
    tokenUrl="/auth/login"
)


def get_current_user(
    token: str = Depends(oauth2_scheme),
    db: Session = Depends(get_db)
):

    credenciais_exception = HTTPException(
        status_code=401,
        detail="Token inválido"
    )

    try:

        payload = jwt.decode(
            token,
            SECRET_KEY,
            algorithms=[ALGORITHM]
        )

        usuario_id = payload.get("id")

        if usuario_id is None:

            raise credenciais_exception

    except JWTError:

        raise credenciais_exception

    usuario = db.query(Usuario).filter(
        Usuario.id == usuario_id
    ).first()

    if usuario is None:

        raise credenciais_exception

    return usuario