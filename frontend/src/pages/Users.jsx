import { useEffect, useState } from "react"

import MainLayout from "../layouts/MainLayout"

import api from "../services/api"

import {
  Pencil,
  Trash2,
  UserPlus,
  KeyRound
} from "lucide-react"


function Users() {

  const [users, setUsers] =
    useState([])

  const [editingId, setEditingId] =
    useState(null)

  const [nome, setNome] =
    useState("")

  const [email, setEmail] =
    useState("")

  const [senha, setSenha] =
    useState("123456")

  const [telefone, setTelefone] =
    useState("")

  const [funcao, setFuncao] =
    useState("")

  const [setor, setSetor] =
    useState("")

  const [tipoUsuario, setTipoUsuario] =
    useState("USER")


  async function loadUsers() {

    try {

      const response = await api.get(
        "/users"
      )

      setUsers(response.data)

    } catch (error) {

      console.log(error)

    }

  }


  useEffect(() => {

    loadUsers()

  }, [])


  function gerarMatricula() {

    return `MAT-${Date.now()}`

  }


  function resetForm() {

    setEditingId(null)

    setNome("")

    setEmail("")

    setSenha("123456")

    setTelefone("")

    setFuncao("")

    setSetor("")

    setTipoUsuario("USER")

  }


  async function handleCreateOrUpdate() {

    try {
          // NOME

      if (
        !/^[A-Za-zÀ-ÿ\s]+$/.test(
          nome
        )
      ) {

        alert(
          "Nome deve conter apenas letras."
        )

        return

      }

      // EMAIL

      const emailRegex =

        /^[^\s@]+@[^\s@]+\.[^\s@]+$/

      if (
        !emailRegex.test(email)
      ) {

        alert(
          "Digite um email válido."
        )

        return

      }

      // TELEFONE

      if (
        !/^\d{10,11}$/.test(
          telefone
        )
      ) {

        alert(
          "Telefone deve conter apenas números e ter 10 ou 11 dígitos."
        )

        return

      }

      // FUNÇÃO

      if (
        !/^[A-Za-zÀ-ÿ\s]+$/.test(
          funcao
        )
      ) {

        alert(
          "Função deve conter apenas letras."
        )

        return

      }

      // SETOR

      if (
        !/^[A-Za-zÀ-ÿ\s]+$/.test(
          setor
        )
      ) {

        alert(
          "Setor deve conter apenas letras."
        )

        return

      }

      if (
        !nome.trim() ||
        !email.trim() ||
        !telefone.trim() ||
        !funcao.trim() ||
        !setor.trim()
      ) {

        alert(
          "Preencha todos os campos obrigatórios."
        )

        return

      }

      if (
        !editingId &&
        !senha.trim()
      ) {

        alert(
          "Informe uma senha para o usuário."
        )

        return

      }

              alert(
                "Preencha todos os campos"
              )

              return

            

      if (
        !email.endsWith("@amostratech.com")
      ) {

        alert(
          "Use um email institucional"
        )

        return

      }

      if (editingId) {

        await api.put(
          `/users/${editingId}`,
          {

            nome,

            email,

            telefone,

            matricula: users.find(
              user => user.id === editingId
            )?.matricula,

            cargo: funcao,

            unidade: setor,

            tipo_usuario: tipoUsuario,

            foto_perfil: null

          }
        )

        alert(
          "Usuário atualizado!"
        )

      }

      else {

        await api.post(
          "/users",
          {

            nome,

            email,

            senha,

            telefone,

            matricula: gerarMatricula(),

            cargo: funcao,

            unidade: setor,

            tipo_usuario: tipoUsuario,

            foto_perfil: null

          }
        )

        alert(
          "Usuário criado!"
        )

      }

      resetForm()

      loadUsers()

    } catch (error) {

      console.log(error)

      alert(
        "Erro ao salvar usuário"
      )

    }

  }


  function handleEditUser(user) {

    setEditingId(user.id)

    setNome(user.nome)

    setEmail(user.email)

    setTelefone(user.telefone)

    setFuncao(user.cargo)

    setSetor(user.unidade)

    setTipoUsuario(
      user.tipo_usuario
    )

  }


  async function handleDeleteUser(id) {

    const confirmar = confirm(
      "Excluir usuário?"
    )

    if (!confirmar) return

    try {

      await api.delete(
        `/users/${id}`
      )

      loadUsers()

    } catch (error) {

      console.log(error)

    }

  }


  async function handleResetPassword(id) {

    const confirmar = confirm(
      "Resetar senha do usuário para 123456?"
    )

    if (!confirmar) return

    try {

      await api.put(
        `/users/resetar-senha/${id}`,
        {
          nova_senha: "123456"
        }
      )

      alert(
        "Senha resetada para 123456"
      )

    } catch (error) {

      console.log(error)

      alert(
        "Erro ao resetar senha"
      )

    }

  }


  return (

    <MainLayout>

      <div className="max-w-7xl mx-auto">

        {/* FORMULÁRIO */}
        <div className="bg-white rounded-3xl shadow-lg p-10 mb-10">

          <div className="flex items-center gap-4 mb-10">

            <UserPlus size={40} />

            <h1 className="text-5xl font-bold">

              {
                editingId
                  ? "Editar Usuário"
                  : "Novo Usuário"
              }

            </h1>

          </div>

          <div className="grid grid-cols-2 gap-6">

            <input
              type="text"
              placeholder="Nome Completo"
              value={nome}
              onChange={(e) =>
                setNome(e.target.value)
              }
              className="p-5 rounded-2xl border-2 border-gray-300 outline-none focus:border-blue-500"
            />

            <input
              type="email"
              placeholder="Email Institucional"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              className="p-5 rounded-2xl border-2 border-gray-300 outline-none focus:border-blue-500"
            />

            <input
              type="text"
              placeholder="Telefone"
              value={telefone}
                onChange={(e) =>
                  setTelefone(
                    e.target.value.replace(
                      /\D/g,
                      ""
                    )
                  )
                }
              className="p-5 rounded-2xl border-2 border-gray-300 outline-none focus:border-blue-500"
            />

           <input
            type="text"
            placeholder="Função"
            value={funcao}
            onChange={(e) =>
              setFuncao(e.target.value)
            }
            className="p-5 rounded-2xl border-2 border-gray-300 outline-none focus:border-blue-500"
            />

            <input
              type="text"
              placeholder="Setor"
              value={setor}
              onChange={(e) =>
                setSetor(e.target.value)
              }
              className="p-5 rounded-2xl border-2 border-gray-300 outline-none focus:border-blue-500"
            />

            <select
              value={tipoUsuario}
              onChange={(e) =>
                setTipoUsuario(
                  e.target.value
                )
              }
              className="p-5 rounded-2xl border-2 border-gray-300 outline-none focus:border-blue-500"
            >

              <option value="USER">
                USER
              </option>

              <option value="ADMIN">
                ADMIN
              </option>

            </select>

          </div>

          <div className="flex gap-4 mt-10">

            <button
              onClick={handleCreateOrUpdate}
              className="bg-blue-500 hover:bg-blue-600 text-white px-10 py-4 rounded-2xl font-bold transition"
            >

              {
                editingId
                  ? "Salvar Alterações"
                  : "Cadastrar Usuário"
              }

            </button>

            {
              editingId && (

                <button
                  onClick={resetForm}
                  className="bg-gray-500 hover:bg-gray-600 text-white px-10 py-4 rounded-2xl font-bold transition"
                >
                  Cancelar
                </button>

              )
            }

          </div>

        </div>

        {/* TABELA */}
        <div className="bg-white rounded-3xl shadow-lg p-10">

          <h1 className="text-4xl font-bold mb-8">
            Lista de Usuários
          </h1>

          <div className="overflow-auto">

            <table className="w-full">

              <thead>

                <tr className="bg-[#dce6fb]">

                  <th className="text-left p-5">
                    Nome
                  </th>

                  <th className="text-left p-5">
                    Email
                  </th>

                  <th className="text-left p-5">
                    Função
                  </th>

                  <th className="text-left p-5">
                    Setor
                  </th>

                  <th className="text-left p-5">
                    Tipo
                  </th>

                  <th className="text-left p-5">
                    Ações
                  </th>

                </tr>

              </thead>

              <tbody>

                {
                  users.map((user) => (

                    <tr
                      key={user.id}
                      className="border-b"
                    >

                      <td className="p-5">
                        {user.nome}
                      </td>

                      <td className="p-5">
                        {user.email}
                      </td>

                      <td className="p-5">
                        {user.cargo}
                      </td>

                      <td className="p-5">
                        {user.unidade}
                      </td>

                      <td className="p-5">

                        {
                          user.tipo_usuario === "ADMIN"
                            ? (
                              <span className="text-red-500 font-bold">
                                ADMIN
                              </span>
                            )
                            : (
                              <span className="text-blue-500 font-bold">
                                USER
                              </span>
                            )
                        }

                      </td>

                      <td className="p-5 flex gap-3">

                        <button
                          onClick={() =>
                            handleEditUser(user)
                          }
                          className="bg-yellow-400 hover:bg-yellow-500 text-white p-3 rounded-xl transition"
                        >

                          <Pencil size={18} />

                        </button>

                        <button
                          onClick={() =>
                            handleResetPassword(user.id)
                          }
                          className="bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-xl transition"
                        >

                          <KeyRound size={18} />

                        </button>

                        <button
                          onClick={() =>
                            handleDeleteUser(user.id)
                          }
                          className="bg-red-500 hover:bg-red-600 text-white p-3 rounded-xl transition"
                        >

                          <Trash2 size={18} />

                        </button>

                      </td>

                    </tr>

                  ))
                }

              </tbody>

            </table>

          </div>

        </div>

      </div>

    </MainLayout>

  )

}

export default Users