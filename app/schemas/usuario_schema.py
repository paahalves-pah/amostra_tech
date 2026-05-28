from pydantic import BaseModel
from typing import Optional


class UsuarioCreate(BaseModel):

    nome: str

    email: str

    senha: str

    telefone: Optional[str] = None

    matricula: Optional[str] = None

    cargo: Optional[str] = None

    unidade: Optional[str] = None

    foto_perfil: Optional[str] = None

    tipo_usuario: str = "USER"


class UsuarioUpdate(BaseModel):

    nome: str

    email: str

    telefone: Optional[str] = None

    matricula: Optional[str] = None

    cargo: Optional[str] = None

    unidade: Optional[str] = None

    foto_perfil: Optional[str] = None

    tipo_usuario: str = "USER"


class UsuarioLogin(BaseModel):

    email: str

    senha: str


class UsuarioResponse(BaseModel):

    id: int

    nome: str

    email: str

    telefone: Optional[str] = None

    matricula: Optional[str] = None

    cargo: Optional[str] = None

    unidade: Optional[str] = None

    foto_perfil: Optional[str] = None

    tipo_usuario: str

    ativo: bool

    class Config:

        from_attributes = True