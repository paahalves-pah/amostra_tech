from app.models.log_model import (
    LogSistema
)


def registrar_log(
    db,
    usuario_id,
    acao,
    entidade,
    registro_id
):

    novo_log = LogSistema(
        usuario_id=usuario_id,

        acao=acao,

        entidade=entidade,

        registro_id=registro_id
    )

    db.add(novo_log)

    db.commit()