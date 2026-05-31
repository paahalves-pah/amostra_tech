# AMOSTRA TECH

Sistema de gerenciamento de coletas laboratoriais desenvolvido com FastAPI e React.

---

# Objetivo

Controlar:

* Pacientes
* Exames
* Coletas laboratoriais
* Resultados
* Usuários
* Permissões
* Auditoria

Sistema voltado para uso interno de clínicas e laboratórios.

---

# Links do Projeto

| Recurso               | Link      |
| --------------------- | --------- |
| Trello                | (https://trello.com/invite/b/6a1c860ba908757c53ed9e0e/ATTId0ddd34d10762965fafcaf28f132f5a9621E3E4F/amostratech) |
| Figma                 | (https://www.figma.com/design/Vu3iC1SOg2qlgNF8rXMwnB/Expotech?node-id=0-1&t=ZEWljXXO0P1mLGkz-1) |
| Fluxograma            | (https://drive.google.com/file/d/1FZhsY3iFBuhyAWGdQFjr517tZTJtlmc8/view?usp=sharing)|
| Vídeo de Demonstração | (https://youtube.com/shorts/sA17GBB-VGM?feature=share) |
| GitHub                | COLE_AQUI |

---

# Tecnologias Utilizadas

## Backend

* Python
* FastAPI
* SQLAlchemy
* SQLite
* JWT Authentication
* Uvicorn
* Pydantic

## Frontend

* React
* JavaScript
* Axios
* React Router
* Vite
* CSS

---

# Funcionalidades

## Usuários

* Cadastro de usuários
* Login JWT
* Controle de permissões
* Bloqueio de usuários
* Reset de senha

## Pacientes

* Cadastro
* Edição
* Exclusão
* Busca por ID
* Paginação

## Exames

* Cadastro de exames
* Listagem
* Atualização
* Exclusão

## Coletas

* Cadastro de coletas
* Associação de múltiplos exames
* Busca por período
* Histórico de coletas
* Paginação

## Resultados

* Cadastro de resultados
* Upload de laudos PDF/imagens
* Controle de status

## Administração

* Dashboard
* Logs do sistema
* Exportação CSV
* Auditoria

---

# Estrutura do Projeto

## Backend

```bash
app/
│
├── auth/
├── database/
├── models/
├── routes/
├── schemas/
├── utils/
│
main.py
```

## Frontend

```bash
frontend/
│
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   ├── pages/
│   ├── services/
│
├── package.json
└── vite.config.js
```

---

# Instalação

## Clonar o Projeto

```bash
git clone LINK_DO_REPOSITORIO
```

Entrar na pasta:

```bash
cd amostra_tech
```

---

# Configuração do Backend

## Criar Ambiente Virtual

### Windows

```bash
python -m venv .venv
```

## Ativar Ambiente Virtual

### PowerShell

```bash
.venv\Scripts\Activate.ps1
```

### CMD

```bash
.venv\Scripts\activate.bat
```

## Instalar Dependências

```bash
pip install -r requirements.txt
```

## Executar API

```bash
uvicorn main:app --reload
```

API disponível em:

```txt
http://localhost:8000
```

Documentação Swagger:

```txt
http://localhost:8000/docs
```

---

# Configuração do Frontend

Abrir um NOVO terminal.

Entrar na pasta:

```bash
cd frontend
```

## Instalar Dependências

```bash
npm install
```

## Executar Frontend

```bash
npm run dev
```

Frontend disponível em:

```txt
http://localhost:5173
```

---

# Como Executar o Sistema

### Terminal 1 - Backend

```bash
.venv\Scripts\Activate.ps1
uvicorn main:app --reload
```

### Terminal 2 - Frontend

```bash
cd frontend
npm run dev
```

---

# Recursos Disponíveis

* Autenticação JWT
* Controle de acesso por usuário
* Gerenciamento de pacientes
* Gerenciamento de exames
* Gerenciamento de coletas
* Gerenciamento de resultados
* Dashboard administrativo
* Auditoria de ações
* Exportação de dados
* Interface Web Responsiva

---

.
