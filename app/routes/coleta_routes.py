from fastapi.responses import StreamingResponse

import csv

from io import StringIO

from fastapi.responses import FileResponse

from reportlab.pdfgen import canvas

import os
from datetime import date

from fastapi import APIRouter
from fastapi import Depends
from fastapi import HTTPException
from sqlalchemy import or_
from sqlalchemy.orm import Session

from app.database.database import get_db

from app.auth.auth_bearer import get_current_user

from app.models.coleta_model import Coleta

from app.utils.logs import registrar_log

from app.models.coleta_exame_model import (
    ColetaExame
)

from app.models.paciente_model import Paciente

from app.models.exame_model import Exame

from app.schemas.coleta_schema import (
    ColetaCreate,
    ColetaResponse
)
from app.models.resultado_model import (
    ResultadoExame
)

router = APIRouter(
    prefix="/coletas",
    tags=["Coletas"]
)


# CRIAR COLETA
@router.post(
    "/",
    response_model=ColetaResponse
)
def criar_coleta(
    coleta: ColetaCreate,
    db: Session = Depends(get_db),
    usuario = Depends(get_current_user)
):

    # VERIFICA PACIENTE
    paciente = db.query(Paciente).filter(
        Paciente.id == coleta.paciente_id
    ).first()

    if not paciente:

        raise HTTPException(
            status_code=404,
            detail="Paciente não encontrado"
        )

    # VERIFICA EXAMES
    for exame_id in coleta.exames_ids:

        exame = db.query(Exame).filter(
            Exame.id == exame_id
        ).first()

        if not exame:

            raise HTTPException(
                status_code=404,
                detail=f"Exame {exame_id} não encontrado"
            )

    # CRIA COLETA
    nova_coleta = Coleta(
        paciente_id=coleta.paciente_id,

        usuario_id=usuario.id,

        data_coleta=coleta.data_coleta,

        hora_coleta=coleta.hora_coleta,

        setor=coleta.setor,

        observacoes=coleta.observacoes
    )

    db.add(nova_coleta)

    db.commit()

    db.refresh(nova_coleta)
    registrar_log(
    db=db,
    usuario_id=usuario.id,
    acao="CREATE",
    entidade="COLETA",
    registro_id=nova_coleta.id
)

    # RELACIONA EXAMES
    for exame_id in coleta.exames_ids:

        coleta_exame = ColetaExame(
            coleta_id=nova_coleta.id,
            exame_id=exame_id
        )

        db.add(coleta_exame)

    db.commit()

    return nova_coleta

# LISTAR COLETAS
@router.get(
    "/",
    response_model=list[ColetaResponse]
)
def listar_coletas(
    skip: int = 0,
    limit: int = 10,
    db: Session = Depends(get_db),
    usuario = Depends(get_current_user)
):

    if limit < 1:
        limit = 10

    if limit > 100:
        limit = 100

    coletas = db.query(
        Coleta
    ).offset(
        skip
    ).limit(
        limit
    ).all()

    return coletas

# BUSCAR COLETA POR ID
@router.get(
    "/{coleta_id}",
    response_model=ColetaResponse
)
def buscar_coleta(
    coleta_id: int,
    db: Session = Depends(get_db),
    usuario = Depends(get_current_user)
):

    coleta = db.query(Coleta).filter(
        Coleta.id == coleta_id
    ).first()

    if not coleta:

        raise HTTPException(
            status_code=404,
            detail="Coleta não encontrada"
        )

    return coleta

# BUSCAR COLETAS POR PACIENTE
@router.get(
    "/paciente/{nome_paciente}",
    response_model=list[ColetaResponse]
)
def buscar_por_paciente(
    nome_paciente: str,
    db: Session = Depends(get_db),
    usuario = Depends(get_current_user)
):

    coletas = db.query(Coleta).join(
        Paciente
    ).filter(
        Paciente.nome.ilike(f"%{nome_paciente}%")
    ).all()

    return coletas

# BUSCAR COLETAS POR EXAME
@router.get(
    "/exame/{nome_exame}",
    response_model=list[ColetaResponse]
)
def buscar_por_exame(
    nome_exame: str,
    db: Session = Depends(get_db),
    usuario = Depends(get_current_user)
):

    coletas = db.query(Coleta).join(
        ColetaExame,
        Coleta.id == ColetaExame.coleta_id
    ).join(
        Exame,
        Exame.id == ColetaExame.exame_id
    ).filter(
        Exame.nome.ilike(f"%{nome_exame}%")
    ).all()

    return coletas

# EDITAR COLETA
@router.put(
    "/{coleta_id}",
    response_model=ColetaResponse
)
def editar_coleta(
    coleta_id: int,
    dados: ColetaCreate,
    db: Session = Depends(get_db),
    usuario = Depends(get_current_user)
):

    coleta = db.query(Coleta).filter(
        Coleta.id == coleta_id
    ).first()

    if not coleta:

        raise HTTPException(
            status_code=404,
            detail="Coleta não encontrada"
        )
        # PERMISSÃO
    if (
        usuario.role != "ADMIN"
        and coleta.usuario_id != usuario.id
    ):

        raise HTTPException(
            status_code=403,
            detail="Sem permissão"
        )
    # VERIFICA PACIENTE
    paciente = db.query(Paciente).filter(
        Paciente.id == dados.paciente_id
    ).first()

    if not paciente:

        raise HTTPException(
            status_code=404,
            detail="Paciente não encontrado"
        )

    # VALIDA EXAMES
    for exame_id in dados.exames_ids:

        exame = db.query(Exame).filter(
            Exame.id == exame_id
        ).first()

        if not exame:

            raise HTTPException(
                status_code=404,
                detail=f"Exame {exame_id} não encontrado"
            )

    # ATUALIZA DADOS
    coleta.paciente_id = dados.paciente_id

    coleta.data_coleta = dados.data_coleta

    coleta.hora_coleta = dados.hora_coleta

    coleta.setor = dados.setor

    coleta.observacoes = dados.observacoes

    db.commit()

    # REMOVE EXAMES ANTIGOS
    db.query(ColetaExame).filter(
        ColetaExame.coleta_id == coleta.id
    ).delete()

    db.commit()

    # ADICIONA NOVOS EXAMES
    for exame_id in dados.exames_ids:

        novo_exame = ColetaExame(
            coleta_id=coleta.id,
            exame_id=exame_id
        )

        db.add(novo_exame)

    db.commit()

    db.refresh(coleta)

    registrar_log(
    db=db,
    usuario_id=usuario.id,
    acao="UPDATE",
    entidade="COLETA",
    registro_id=coleta.id
)
    return coleta

# DELETAR COLETA
@router.delete("/{coleta_id}")
def deletar_coleta(
    coleta_id: int,
    db: Session = Depends(get_db),
    usuario = Depends(get_current_user)
):

    coleta = db.query(Coleta).filter(
        Coleta.id == coleta_id
    ).first()

    if not coleta:

        raise HTTPException(
            status_code=404,
            detail="Coleta não encontrada"
        )
        # PERMISSÃO
    if (
        usuario.role != "ADMIN"
        and coleta.usuario_id != usuario.id
    ):

        raise HTTPException(
            status_code=403,
            detail="Sem permissão"
        )
    # REMOVE RELAÇÃO EXAMES
    db.query(ColetaExame).filter(
        ColetaExame.coleta_id == coleta.id
    ).delete()

    db.commit()

    # REMOVE COLETA
    db.delete(coleta)

    db.commit()

    registrar_log(
    db=db,
    usuario_id=usuario.id,
    acao="DELETE",
    entidade="COLETA",
    registro_id=coleta.id
)
    return {
        "mensagem": "Coleta deletada com sucesso"
    }

# GERAR PDF DA COLETA
@router.get("/pdf/{coleta_id}")
def gerar_pdf_coleta(
    coleta_id: int,
    db: Session = Depends(get_db),
    usuario = Depends(get_current_user)
):

    coleta = db.query(Coleta).filter(
        Coleta.id == coleta_id
    ).first()

    if not coleta:

        raise HTTPException(
            status_code=404,
            detail="Coleta não encontrada"
        )

    resultados = db.query(
        ResultadoExame
    ).filter(
        ResultadoExame.coleta_id == coleta.id
    ).all()

    nome_arquivo = (
        f"coleta_{coleta.id}.pdf"
    )

    pdf = canvas.Canvas(nome_arquivo)

    # TÍTULO
    pdf.setFont("Helvetica-Bold", 16)

    pdf.drawString(
        200,
        800,
        "AMOSTRA TECH"
    )

    pdf.setFont("Helvetica", 12)

    # DADOS
    pdf.drawString(
        50,
        760,
        f"Paciente: {coleta.paciente.nome}"
    )

    pdf.drawString(
        50,
        740,
        f"Responsável: {coleta.usuario.nome}"
    )

    pdf.drawString(
        50,
        720,
        f"Data: {coleta.data_coleta}"
    )

    pdf.drawString(
        50,
        700,
        f"Hora: {coleta.hora_coleta}"
    )

    pdf.drawString(
        50,
        680,
        f"Setor: {coleta.setor}"
    )

    pdf.drawString(
        50,
        650,
        "RESULTADOS:"
    )

    y = 620

    for resultado in resultados:

        exame = db.query(Exame).filter(
            Exame.id == resultado.exame_id
        ).first()

        texto = (
            f"{exame.nome} → "
            f"{resultado.resultado}"
        )

        pdf.drawString(
            70,
            y,
            texto
        )

        y -= 25

    pdf.save()

    return FileResponse(
        path=nome_arquivo,
        filename=nome_arquivo,
        media_type='application/pdf'
    )

# EXPORTAR COLETAS CSV
@router.get("/exportar/csv")
def exportar_coletas_csv(
    db: Session = Depends(get_db),
    usuario = Depends(get_current_user)
):

    # SOMENTE ADMIN
    if usuario.role != "ADMIN":

        raise HTTPException(
            status_code=403,
            detail="Acesso negado"
        )

    output = StringIO()

    writer = csv.writer(output)

    # CABEÇALHO
    writer.writerow([
        "ID",
        "PACIENTE_ID",
        "USUARIO_ID",
        "DATA_COLETA",
        "HORA_COLETA",
        "SETOR",
        "OBSERVACOES"
    ])

    # DADOS
    coletas = db.query(Coleta).all()

    for coleta in coletas:

        writer.writerow([
            coleta.id,
            coleta.paciente_id,
            coleta.usuario_id,
            coleta.data_coleta,
            coleta.hora_coleta,
            coleta.setor,
            coleta.observacoes
        ])

    output.seek(0)

    return StreamingResponse(
        iter([output.getvalue()]),
        media_type="text/csv",
        headers={
            "Content-Disposition":
            "attachment; filename=coletas.csv"
        }
    )

# BUSCAR COLETAS POR PERÍODO
@router.get(
    "/periodo",
    response_model=list[ColetaResponse]
)
# BUSCAR COLETAS POR PERÍODO
@router.get(
    "/periodo",
    response_model=list[ColetaResponse]
)
def buscar_coletas_periodo(
    inicio: date,
    fim: date,
    db: Session = Depends(get_db),
    usuario = Depends(get_current_user)
):

    # ADMIN VÊ TUDO
    if usuario.role == "ADMIN":

        coletas = db.query(
            Coleta
        ).filter(
            Coleta.data_coleta >= inicio,
            Coleta.data_coleta <= fim
        ).all()

        return coletas

    # USUÁRIO VÊ APENAS AS PRÓPRIAS
    coletas = db.query(
        Coleta
    ).filter(
        Coleta.usuario_id == usuario.id,
        Coleta.data_coleta >= inicio,
        Coleta.data_coleta <= fim
    ).all()

    return coletas

