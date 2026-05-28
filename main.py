from fastapi import FastAPI

from fastapi.middleware.cors import (
    CORSMiddleware
)

from fastapi.staticfiles import (
    StaticFiles
)

from sqlalchemy.orm import Session

from app.database.database import (
    engine,
    Base,
    SessionLocal
)

from app.models.usuario_model import (
    Usuario
)

from app.models.exame_model import (
    Exame
)

from app.routes.auth_routes import (
    router as auth_router
)

from app.routes.usuario_routes import (
    router as usuario_router
)

from app.routes.exame_routes import (
    router as exame_router
)

from app.auth.security import (
    gerar_hash_senha
)


app = FastAPI()


# CORS
app.add_middleware(

    CORSMiddleware,

    allow_origins=[
        "http://localhost:5173"
    ],

    allow_credentials=True,

    allow_methods=["*"],

    allow_headers=["*"]

)


# STATIC FILES
app.mount(

    "/uploads",

    StaticFiles(directory="uploads"),

    name="uploads"

)


# DATABASE
Base.metadata.create_all(bind=engine)


# ADMIN PADRÃO
db: Session = SessionLocal()

admin_existente = db.query(Usuario).filter(
    Usuario.email == "admin@amostratech.com"
).first()


if admin_existente:

    admin_existente.tipo_usuario = "ADMIN"

    admin_existente.ativo = True

    db.commit()

else:

    admin = Usuario(

        nome="Administrador",

        email="admin@amostratech.com",

        senha=gerar_hash_senha("123456"),

        tipo_usuario="ADMIN",

        first_access=False,

        ativo=True

    )

    db.add(admin)

    db.commit()


db.close()


# ROTAS
app.include_router(auth_router)

app.include_router(usuario_router)

app.include_router(exame_router)


@app.get("/")
def home():

    return {
        "message": "AmostraTech API"
    }