from fastapi import Depends
from fastapi import HTTPException

from app.auth.auth_bearer import get_current_user


# PERMISSÃO ADMIN
def admin_required(
    usuario = Depends(get_current_user)
):

    if usuario.tipo_usuario != "ADMIN":

        raise HTTPException(
            status_code=403,
            detail="Acesso negado"
        )

    return usuario