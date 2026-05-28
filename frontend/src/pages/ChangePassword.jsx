import { useState } from "react"
import { useNavigate } from "react-router-dom"

import MainLayout from "../layouts/MainLayout"
import Sidebar from "../components/Sidebar"

import api from "../services/api"

function ChangePassword() {

  const navigate = useNavigate()

  const [currentPassword, setCurrentPassword] =
    useState("")

  const [newPassword, setNewPassword] =
    useState("")

  const [confirmPassword, setConfirmPassword] =
    useState("")


  async function handleChangePassword() {

    try {

      if (
        !currentPassword ||
        !newPassword ||
        !confirmPassword
      ) {

        alert("Preencha todos os campos")

        return
      }

      if (newPassword !== confirmPassword) {

        alert("As senhas não coincidem")

        return
      }

      await api.put(
        "/auth/change-password",
        {

          senha_atual: currentPassword,

          nova_senha: newPassword

        }
      )

      localStorage.setItem(
        "firstAccess",
        "false"
      )

      alert("Senha alterada com sucesso!")

      navigate("/home")

    } catch (error) {

      console.log(error)

      alert("Erro ao alterar senha")

    }

  }


  return (
    <MainLayout>

      <div className="flex gap-8">

        <Sidebar />

        <div className="flex-1 flex items-center justify-center">

          <div className="bg-white p-10 rounded-3xl shadow w-[500px]">

            <h1 className="text-3xl font-bold mb-2">
              Alterar Senha
            </h1>

            <p className="text-gray-500 mb-8">
              Atualize sua senha de acesso.
            </p>

            <div className="flex flex-col gap-5">

              <input
                type="password"
                placeholder="Senha atual"
                value={currentPassword}
                onChange={(e) =>
                  setCurrentPassword(
                    e.target.value
                  )
                }
                className="p-3 rounded-xl border border-gray-300 outline-none"
              />

              <input
                type="password"
                placeholder="Nova senha"
                value={newPassword}
                onChange={(e) =>
                  setNewPassword(
                    e.target.value
                  )
                }
                className="p-3 rounded-xl border border-gray-300 outline-none"
              />

              <input
                type="password"
                placeholder="Confirmar nova senha"
                value={confirmPassword}
                onChange={(e) =>
                  setConfirmPassword(
                    e.target.value
                  )
                }
                className="p-3 rounded-xl border border-gray-300 outline-none"
              />

              <button
                onClick={handleChangePassword}
                className="bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-xl transition"
              >
                Alterar Senha
              </button>

            </div>

          </div>

        </div>

      </div>

    </MainLayout>
  )
}

export default ChangePassword