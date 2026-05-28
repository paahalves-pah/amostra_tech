import { useState } from "react"

import api from "../services/api"

function EditUserModal({

  user,

  onClose

}) {

  const [nome, setNome] = useState(
    user.nome
  )

  const [telefone, setTelefone] =
    useState(user.telefone || "")

  const [cargo, setCargo] =
    useState(user.cargo || "")

  const [unidade, setUnidade] =
    useState(user.unidade || "")


  async function handleEditUser() {

    try {

      await api.put(
        `/auth/edit-user/${user.id}`,
        {

          nome,

          telefone,

          cargo,

          unidade

        }
      )

      alert("Usuário atualizado!")

      onClose()

    } catch (error) {

      console.log(error)

      alert("Erro ao editar usuário")

    }

  }

  return (

    <div className="bg-white p-10 rounded-3xl w-[500px] shadow">

      <h1 className="text-2xl font-bold mb-6">
        Editar Usuário
      </h1>

      <div className="flex flex-col gap-4">

        <input
          type="text"
          placeholder="Nome"
          value={nome}
          onChange={(e) =>
            setNome(e.target.value)
          }
          className="p-3 border rounded-xl"
        />

        <input
          type="text"
          placeholder="Telefone"
          value={telefone}
          onChange={(e) =>
            setTelefone(e.target.value)
          }
          className="p-3 border rounded-xl"
        />

        <input
          type="text"
          placeholder="Cargo"
          value={cargo}
          onChange={(e) =>
            setCargo(e.target.value)
          }
          className="p-3 border rounded-xl"
        />

        <input
          type="text"
          placeholder="Unidade"
          value={unidade}
          onChange={(e) =>
            setUnidade(e.target.value)
          }
          className="p-3 border rounded-xl"
        />

        <button
          onClick={handleEditUser}
          className="bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-xl transition"
        >
          Salvar
        </button>

      </div>

    </div>

  )

}

export default EditUserModal