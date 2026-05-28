import { useState } from "react"

import api from "../services/api"

function UserModal({ onClose }) {

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [role, setRole] = useState("USER")

  async function handleCreateUser() {

    try {

      if (
        !name ||
        !email ||
        !password
      ) {
        alert("Preencha todos os campos")
        return
      }

      if (
        !email.endsWith("@amostratech.com")
      ) {
        alert(
          "Use um e-mail @amostratech.com"
        )
        return
      }

      await api.post(
        "/auth/register",
        {

          nome: name,

          email: email,

          senha: password,

          tipo_usuario: role

        }
      )

      alert("Usuário cadastrado!")

      onClose()

    } catch (error) {

      console.log(error)

      alert("Erro ao cadastrar usuário")

    }

  }

  return (
    <div className="bg-white p-8 rounded-3xl shadow-2xl w-[500px]">

      <h2 className="text-3xl font-bold mb-2">
        Novo Usuário
      </h2>

      <p className="text-gray-500 mb-8">
        Cadastre um novo usuário no sistema.
      </p>

      <div className="flex flex-col gap-5">

        {/* Nome */}
        <div>

          <label className="text-sm font-semibold text-gray-600">
            Nome
          </label>

          <input
            type="text"
            placeholder="Digite o nome"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
            className="w-full mt-2 p-3 rounded-xl border border-gray-300 outline-none focus:border-blue-500"
          />

        </div>

        {/* Email */}
        <div>

          <label className="text-sm font-semibold text-gray-600">
            E-mail corporativo
          </label>

          <input
            type="email"
            placeholder="usuario@amostratech.com"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            className="w-full mt-2 p-3 rounded-xl border border-gray-300 outline-none focus:border-blue-500"
          />

        </div>

        {/* Senha */}
        <div>

          <label className="text-sm font-semibold text-gray-600">
            Senha Temporária
          </label>

          <input
            type="password"
            placeholder="Digite a senha inicial"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            className="w-full mt-2 p-3 rounded-xl border border-gray-300 outline-none focus:border-blue-500"
          />

        </div>

        {/* Perfil */}
        <div>

          <label className="text-sm font-semibold text-gray-600">
            Perfil
          </label>

          <select
            value={role}
            onChange={(e) =>
              setRole(e.target.value)
            }
            className="w-full mt-2 p-3 rounded-xl border border-gray-300 outline-none focus:border-blue-500"
          >

            <option value="USER">
              Usuário
            </option>

            <option value="ADMIN">
              Administrador
            </option>

          </select>

        </div>

        <button
          onClick={handleCreateUser}
          className="bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-xl transition mt-4"
        >
          Cadastrar Usuário
        </button>

      </div>

    </div>
  )
}

export default UserModal