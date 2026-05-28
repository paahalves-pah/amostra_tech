# AMOSTRA TECH

Sistema de gerenciamento de coletas laboratoriais desenvolvido com FastAPI + MySQL.

---

# Objetivo

Controlar:
- pacientes
- exames
- coletas laboratoriais
- resultados
- usuários
- permissões
- auditoria

Sistema voltado para uso interno de clínicas e laboratórios.

---

# Tecnologias utilizadas

- Python
- FastAPI
- SQLAlchemy
- MySQL
- JWT Authentication
- Uvicorn
- Pydantic

---

# Funcionalidades

## Usuários
- Cadastro de usuários
- Login JWT
- Controle de permissões
- Bloqueio de usuários
- Reset de senha

## Pacientes
- Cadastro
- Edição
- Exclusão
- Busca por ID
- Paginação

## Exames
- Cadastro de exames
- Listagem
- Atualização
- Exclusão

## Coletas
- Cadastro de coletas
- Associação de múltiplos exames
- Busca por período
- Histórico de coletas
- Paginação

## Resultados
- Cadastro de resultados
- Upload de laudos PDF/imagens
- Controle de status

## Administração
- Dashboard
- Logs do sistema
- Exportação CSV
- Auditoria

---

# Estrutura do Projeto

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

# Instalação

## Criar ambiente virtual

### Windows

```bash
python -m venv .venv