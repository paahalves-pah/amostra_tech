import {
  useState,
  useEffect
} from "react"

import MainLayout from "../layouts/MainLayout"

import api from "../services/api"

import {
  User
} from "lucide-react"


function Profile() {

  const localUser = JSON.parse(
    localStorage.getItem("user")
  )

  const [user, setUser] =
    useState({})

  const [nome, setNome] =
    useState("")

  const [email, setEmail] =
    useState("")

  const [matricula, setMatricula] =
    useState("")

  const [cargo, setCargo] =
    useState("")

  const [setor, setSetor] =
    useState("")

  const [telefone, setTelefone] =
    useState("")

  const [fotoPerfil, setFotoPerfil] =
    useState(null)


  async function loadProfile() {

    try {

      const response = await api.get(
        "/auth/users"
      )

      const usuario =
        response.data.find(
          item => item.id === localUser.id
        )

      if (!usuario) return

      setUser(usuario)

      setNome(
        usuario.nome || ""
      )

      setEmail(
        usuario.email || ""
      )

      setMatricula(
        usuario.matricula || ""
      )

      setCargo(
        usuario.cargo || ""
      )

      setSetor(
        usuario.unidade || ""
      )

      setTelefone(
        usuario.telefone || ""
      )

      setFotoPerfil(
        usuario.foto_perfil || null
      )

    } catch (error) {

      console.log(error)

    }

  }


  useEffect(() => {

    loadProfile()

  }, [])


  function handleFoto(event) {

    const file =
      event.target.files[0]

    if (!file) return

    const reader = new FileReader()

    reader.onloadend = () => {

      setFotoPerfil(
        reader.result
      )

    }

    reader.readAsDataURL(file)

  }


  async function handleSaveProfile() {

    try {

      await api.put(
        `/auth/users/${localUser.id}`,
        {

          nome: user.nome,

          email: user.email,

          telefone: user.telefone,

          cargo: user.cargo,

          unidade: user.unidade,

          tipo_usuario: user.tipo_usuario,

          matricula: user.matricula,

          foto_perfil: fotoPerfil

        }
      )

      alert(
        "Perfil atualizado!"
      )

      loadProfile()

    } catch (error) {

      console.log(error)

      alert(
        "Erro ao atualizar perfil"
      )

    }

  }


  return (

    <MainLayout>

      <div className="max-w-7xl mx-auto">

        <div className="bg-[#eef4ff] rounded-3xl p-10 flex gap-20">

          {/* ESQUERDA */}
          <div className="w-[350px] flex flex-col items-center">

            <div className="w-full mb-10">

              <label className="text-xl text-gray-600">
                Cargo
              </label>

              <input
                type="text"
                value={cargo}
                disabled
                className="w-full bg-transparent border-b-4 border-black outline-none text-2xl py-2"
              />

            </div>

            <div className="w-[250px] h-[250px] rounded-full bg-gray-200 flex items-center justify-center overflow-hidden shadow">

              {
                fotoPerfil
                  ? (
                    <img
                      src={fotoPerfil}
                      alt="Foto Perfil"
                      className="w-full h-full object-cover"
                    />
                  )
                  : (
                    <User size={90} />
                  )
              }

            </div>

            <label className="mt-8 cursor-pointer text-xl hover:text-blue-600 transition">

              Editar foto

              <input
                type="file"
                className="hidden"
                onChange={handleFoto}
              />

            </label>

            <button
              onClick={handleSaveProfile}
              className="mt-8 bg-blue-500 hover:bg-blue-600 text-white px-10 py-4 rounded-2xl text-xl font-bold transition"
            >
              Salvar Foto
            </button>

          </div>

          {/* DIREITA */}
          <div className="flex-1 grid grid-cols-2 gap-8">

            <input
              type="text"
              value={nome}
              disabled
              className="p-5 rounded-3xl border-4 border-gray-700 text-xl bg-white"
            />

            <input
              type="email"
              value={email}
              disabled
              className="p-5 rounded-3xl border-4 border-gray-700 text-xl bg-white"
            />

            <input
              type="text"
              value={matricula}
              disabled
              className="p-5 rounded-3xl border-4 border-gray-700 text-xl bg-white"
            />

            <input
              type="text"
              value={setor}
              disabled
              className="p-5 rounded-3xl border-4 border-gray-700 text-xl bg-white"
            />

            <input
              type="text"
              value={telefone}
              disabled
              className="p-5 rounded-3xl border-4 border-gray-700 text-xl bg-white"
            />

          </div>

        </div>

      </div>

    </MainLayout>

  )

}

export default Profile