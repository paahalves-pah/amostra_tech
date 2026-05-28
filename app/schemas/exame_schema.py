from pydantic import BaseModel


class ExameCreate(BaseModel):

    paciente: str

    cpf: str

    data_nascimento: str

    telefone: str

    tipo_exame: str

    prioridade: str

    responsavel: str

    observacoes: str

    data_coleta: str


class ExameUpdate(BaseModel):

    paciente: str

    cpf: str

    data_nascimento: str

    telefone: str

    tipo_exame: str

    status: str

    prioridade: str

    responsavel: str

    observacoes: str

    data_coleta: str