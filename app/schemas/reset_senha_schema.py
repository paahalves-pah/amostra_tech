from pydantic import BaseModel


class ResetSenha(BaseModel):

    nova_senha: str

