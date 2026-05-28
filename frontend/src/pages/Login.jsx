import { useState } from "react"
import { useNavigate } from "react-router-dom"

import api from "../services/api"


function Login() {

  const navigate = useNavigate()

  const [email, setEmail] =
    useState("")

  const [senha, setSenha] =
    useState("")


  async function handleLogin(e) {

    e.preventDefault()

    try {

      const response = await api.post(
        "/auth/login",
        {

          email,

          senha

        }
      )

      localStorage.setItem(
        "token",
        response.data.access_token
      )

      localStorage.setItem(
        "user",
        JSON.stringify(response.data.user)
      )

      navigate("/dashboard")

    } catch (error) {

      console.log(error)

      alert(
        "Email ou senha inválidos"
      )

    }

  }


  return (

    <div className="min-h-screen bg-[#1d1d1d] flex items-center justify-center p-10">

      <div className="w-[1000px] h-[600px] bg-[#eef4ff] rounded-3xl shadow-2xl flex overflow-hidden">

        {/* ESQUERDA */}
        <div className="w-1/2 flex items-center justify-center p-8">

          <div className="bg-white rounded-3xl shadow-xl w-full h-full flex flex-col items-center justify-center relative overflow-hidden">

            <img
              src="https://cdn-icons-png.flaticon.com/512/2785/2785544.png"
              alt="Laboratório"
              className="w-44 mb-6"
            />

            <h1 className="text-5xl font-bold text-center leading-tight">

              <span className="text-[#1b2a41]">
                AMOSTRA
              </span>

              <br />

              <span className="text-red-500">
                TECH
              </span>

            </h1>

            <div className="absolute bottom-0 w-full h-32 bg-gradient-to-t from-blue-100 to-transparent" />

          </div>

        </div>

        {/* DIREITA */}
        <div className="w-1/2 bg-[#b7c9f5] flex flex-col justify-center px-16">

          <h1 className="text-5xl font-bold mb-4">
            Bem-vindo de volta!
          </h1>

          <p className="text-gray-700 mb-12">
            Faça login para continuar
          </p>

          <form
            onSubmit={handleLogin}
            className="flex flex-col gap-8"
          >

            <div>

              <label className="text-sm text-gray-700">
                Email
              </label>

              <input
                type="email"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                className="w-full bg-transparent border-b-2 border-black outline-none py-2"
              />

            </div>

            <div>

              <label className="text-sm text-gray-700">
                Senha
              </label>

              <input
                type="password"
                value={senha}
                onChange={(e) =>
                  setSenha(e.target.value)
                }
                className="w-full bg-transparent border-b-2 border-black outline-none py-2"
              />

            </div>

            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-4 rounded-2xl transition shadow-lg mt-4"
            >
              Entrar
            </button>

          </form>

        </div>

      </div>

    </div>

  )

}

export default Login