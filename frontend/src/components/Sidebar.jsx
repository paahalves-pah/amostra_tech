import { Link } from "react-router-dom"

import {
  User
} from "lucide-react"


function Sidebar() {

  const user = JSON.parse(
    localStorage.getItem("user")
  )

  return (

    <div className="w-full h-20 bg-[#dce6fb] flex items-center justify-between px-10 shadow">

      {/* LOGO */}
      <div className="flex items-center gap-3">

        <img
          src="https://cdn-icons-png.flaticon.com/512/2785/2785544.png"
          alt="Logo"
          className="w-10 h-10"
        />

      </div>

      {/* MENU */}
      <div className="flex items-center gap-20 text-2xl font-semibold">

        <Link
          to="/dashboard"
          className="hover:text-blue-600 transition"
        >
          Home
        </Link>

        <Link
          to="/exams"
          className="hover:text-blue-600 transition"
        >
          Exames
        </Link>

        <Link
          to="/coletas"
          className="hover:text-blue-600 transition"
        >
          Coletas
        </Link>

        {
          user?.tipo_usuario === "ADMIN"
          && (

            <Link
              to="/users"
              className="hover:text-blue-600 transition"
            >
              Usuários
            </Link>

          )
        }

      </div>

     {/* PERFIL */}
<div className="flex items-center gap-5">

  <Link
    to="/profile"
    className="hover:text-blue-600 transition"
  >

    <User
      size={35}
      className="text-gray-700"
    />

  </Link>

  <button

    onClick={() => {

      localStorage.removeItem("token")

      localStorage.removeItem("user")

      window.location.href = "/"

    }}

    className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-xl font-semibold transition"
  >

    Sair

  </button>

</div>

    </div>

  )

}

export default Sidebar