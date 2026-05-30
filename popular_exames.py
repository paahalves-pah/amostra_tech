from app.database.database import SessionLocal
from app.models.exame_model import Exame

import random

db = SessionLocal()

nomes = [
    "Maria Silva",
    "João Souza",
    "Ana Oliveira",
    "Carlos Lima",
    "Fernanda Santos",
    "Lucas Pereira",
    "Juliana Costa",
    "Marcos Rocha",
    "Patricia Gomes",
    "Ricardo Alves",
    "Camila Martins",
    "Bruno Ferreira",
    "Larissa Melo",
    "Rafael Dias",
    "Beatriz Nunes",
    "Thiago Ribeiro",
    "Vanessa Lopes",
    "Eduardo Teixeira",
    "Amanda Cardoso",
    "Gabriel Moraes",
    "Paula Freitas",
    "Rodrigo Barbosa",
    "Carolina Vieira",
    "Felipe Moreira",
    "Tatiane Araujo",
    "Vinicius Cunha",
    "Julio Cesar",
    "Renata Castro",
    "Leonardo Prado",
    "Monica Ribeiro"
]

exames = [
    "Hemograma Completo",
    "Glicemia de Jejum",
    "Colesterol Total",
    "TSH",
    "COVID-19",
    "Dengue",
    "Vitamina D",
    "Creatinina",
    "Ureia",
    "Ferritina"
]

status_lista = [
    "PENDENTE",
    "EM ANÁLISE",
    "CONCLUÍDO"
]

prioridades = [
    "NORMAL",
    "URGENTE"
]

for i, nome in enumerate(nomes, start=1):

    exame = Exame(

        paciente=nome,

        cpf=f"{i:011}",

        data_nascimento="1990-01-01",

        telefone=f"1199999{i:04}",

        prontuario=f"PRONT-{10000+i}",

        protocolo=f"COL-20260529-{1000+i}",

        tipo_exame=random.choice(exames),

        status=random.choice(status_lista),

        prioridade=random.choice(prioridades),

        responsavel=random.choice([
            "Ana Paula",
            "Carlos Lima",
            "Fernanda Rocha"
        ]),

        observacoes="Cadastro fictício para demonstração.",

        data_coleta="2026-05-29"

    )

    db.add(exame)

db.commit()

db.close()

print("30 exames cadastrados com sucesso!")