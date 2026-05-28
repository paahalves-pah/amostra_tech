from fastapi import Depends
from fastapi import HTTPException

from fastapi.security import HTTPBearer
from fastapi.security import HTTPAuthorizationCredentials

from app.auth.jwt_handler import verificar_token


security = HTTPBearer()


def verificar_usuario_logado(

    credenciais: HTTPAuthorizationCredentials = Depends(security)

):

    token = credenciais.credentials

    payload = verificar_token(token)

    if not payload:

        raise HTTPException(
            status_code=401,
            detail="Token inválido"
        )

    return payload