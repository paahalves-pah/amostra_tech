import { useEffect } from "react"
import { useState } from "react"

import MainLayout from "../layouts/MainLayout"

import api from "../services/api"


function Dashboard() {

  const [exams, setExams] =
    useState([])


  async function loadData() {

    try {

      const response = await api.get(
        "/exams"
      )

      setExams(response.data)

    } catch (error) {

      console.log(error)

    }

  }


  useEffect(() => {

    loadData()

  }, [])


  const totalColetas =
    exams.length

  const pendentes =
    exams.filter(
      exam =>
        exam.status === "PENDENTE"
    ).length

  const emAnalise =
    exams.filter(
      exam =>
        exam.status === "EM ANÁLISE"
    ).length

  const concluidos =
    exams.filter(
      exam =>
        exam.status === "CONCLUÍDO"
    ).length

  const urgentes =
    exams.filter(
      exam =>
        exam.prioridade === "URGENTE"
    ).length


  return (

    <MainLayout>

      <h1 className="text-5xl font-bold mb-10">
        Dashboard
      </h1>

      {/* CARDS */}
      <div className="grid grid-cols-5 gap-5">

        <div className="bg-white rounded-2xl shadow p-6">

          <h2 className="text-gray-500 text-sm">
            TOTAL COLETAS
          </h2>

          <p className="text-4xl font-bold mt-4">
            {totalColetas}
          </p>

        </div>

        <div className="bg-yellow-100 rounded-2xl shadow p-6">

          <h2 className="text-yellow-700 text-sm">
            PENDENTES
          </h2>

          <p className="text-4xl font-bold mt-4 text-yellow-700">
            {pendentes}
          </p>

        </div>

        <div className="bg-blue-100 rounded-2xl shadow p-6">

          <h2 className="text-blue-700 text-sm">
            EM ANÁLISE
          </h2>

          <p className="text-4xl font-bold mt-4 text-blue-700">
            {emAnalise}
          </p>

        </div>

        <div className="bg-green-100 rounded-2xl shadow p-6">

          <h2 className="text-green-700 text-sm">
            CONCLUÍDOS
          </h2>

          <p className="text-4xl font-bold mt-4 text-green-700">
            {concluidos}
          </p>

        </div>

        <div className="bg-red-100 rounded-2xl shadow p-6">

          <h2 className="text-red-700 text-sm">
            URGENTES
          </h2>

          <p className="text-4xl font-bold mt-4 text-red-700">
            {urgentes}
          </p>

        </div>

      </div>

      {/* ÚLTIMAS COLETAS */}
      <div className="bg-white rounded-2xl shadow p-8 mt-10">

        <h2 className="text-2xl font-bold mb-6">
          Últimas Coletas
        </h2>

        <div className="overflow-auto">

          <table className="w-full">

            <thead className="bg-[#dce6fb]">

              <tr>

                <th className="text-left p-4">
                  Protocolo
                </th>

                <th className="text-left p-4">
                  Paciente
                </th>

                <th className="text-left p-4">
                  Status
                </th>

                <th className="text-left p-4">
                  Prioridade
                </th>

              </tr>

            </thead>

            <tbody>

              {
                exams.slice(0, 5).map((exam) => (

                  <tr
                    key={exam.id}
                    className="border-t"
                  >

                    <td className="p-4 font-bold text-blue-600">
                      {exam.protocolo}
                    </td>

                    <td className="p-4">
                      {exam.paciente}
                    </td>

                    <td className="p-4">

                      {
                        exam.status === "PENDENTE"
                          ? (
                            <span className="text-yellow-600 font-bold">
                              PENDENTE
                            </span>
                          )
                          : exam.status === "EM ANÁLISE"
                            ? (
                              <span className="text-blue-600 font-bold">
                                EM ANÁLISE
                              </span>
                            )
                            : (
                              <span className="text-green-600 font-bold">
                                CONCLUÍDO
                              </span>
                            )
                      }

                    </td>

                    <td className="p-4">

                      {
                        exam.prioridade === "URGENTE"
                          ? (
                            <span className="text-red-600 font-bold">
                              URGENTE
                            </span>
                          )
                          : (
                            <span className="text-green-600 font-bold">
                              NORMAL
                            </span>
                          )
                      }

                    </td>

                  </tr>

                ))
              }

            </tbody>

          </table>

        </div>

      </div>

    </MainLayout>

  )

}

export default Dashboard