import { useEffect } from "react"
import { useState } from "react"

import MainLayout from "../layouts/MainLayout"

import api from "../services/api"


function Exams() {

  const [exams, setExams] =
    useState([])

  const [filteredExams, setFilteredExams] =
    useState([])

  const [search, setSearch] =
    useState("")

  const [statusFilter, setStatusFilter] =
    useState("TODOS")

  const [selectedExam, setSelectedExam] =
    useState(null)


  async function loadExams() {

    try {

      const response = await api.get(
        "/exams"
      )

      setExams(response.data)

      setFilteredExams(response.data)

    } catch (error) {

      console.log(error)

    }

  }


  function handleFilter() {

    let filtered = exams

    if (search) {

      filtered = filtered.filter((exam) =>

        exam.paciente
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          )

        ||

        exam.cpf
          ?.includes(search)

        ||

        exam.protocolo
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          )

      )

    }

    if (statusFilter !== "TODOS") {

      filtered = filtered.filter(
        exam =>
          exam.status === statusFilter
      )

    }

    setFilteredExams(filtered)

  }


  useEffect(() => {

    loadExams()

  }, [])


  useEffect(() => {

    handleFilter()

  }, [search, statusFilter, exams])


  return (

    <MainLayout>

      <div className="max-w-7xl mx-auto">

        {/* BUSCA */}
        <div className="bg-white rounded-2xl shadow p-8 mb-10">

          <h1 className="text-4xl font-bold mb-6">
            Buscar Exames
          </h1>

          <div className="grid grid-cols-2 gap-5">

            <input
              type="text"
              placeholder="Buscar por paciente, CPF ou protocolo"
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              className="p-4 border rounded-xl"
            />

            <select
              value={statusFilter}
              onChange={(e) =>
                setStatusFilter(
                  e.target.value
                )
              }
              className="p-4 border rounded-xl"
            >

              <option value="TODOS">
                TODOS STATUS
              </option>

              <option value="PENDENTE">
                PENDENTE
              </option>

              <option value="EM ANÁLISE">
                EM ANÁLISE
              </option>

              <option value="CONCLUÍDO">
                CONCLUÍDO
              </option>

            </select>

          </div>

        </div>

        {/* TABELA */}
        <div className="bg-white rounded-2xl shadow p-8">

          <h1 className="text-4xl font-bold mb-6">
            Lista de Exames
          </h1>

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
                    CPF
                  </th>

                  <th className="text-left p-4">
                    Exames
                  </th>

                  <th className="text-left p-4">
                    Status
                  </th>

                  <th className="text-left p-4">
                    Prioridade
                  </th>

                  <th className="text-left p-4">
                    Ações
                  </th>

                </tr>

              </thead>

              <tbody>

                {
                  filteredExams.map((exam) => (

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
                        {exam.cpf}
                      </td>

                      <td className="p-4">
                        {exam.tipo_exame}
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

                      <td className="p-4">

                        <button
                          onClick={() =>
                            setSelectedExam(exam)
                          }
                          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-xl"
                        >
                          Visualizar
                        </button>

                      </td>

                    </tr>

                  ))
                }

              </tbody>

            </table>

          </div>

        </div>

        {/* MODAL */}
        {
          selectedExam && (

            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

              <div className="bg-white rounded-3xl p-10 w-[700px] shadow-2xl">

                <h1 className="text-4xl font-bold mb-8">
                  Informações da Coleta
                </h1>

                <div className="grid grid-cols-2 gap-6">

                  <div>
                    <p className="font-bold">
                      Protocolo
                    </p>

                    <p>
                      {selectedExam.protocolo}
                    </p>
                  </div>

                  <div>
                    <p className="font-bold">
                      Prontuário
                    </p>

                    <p>
                      {selectedExam.prontuario}
                    </p>
                  </div>

                  <div>
                    <p className="font-bold">
                      Paciente
                    </p>

                    <p>
                      {selectedExam.paciente}
                    </p>
                  </div>

                  <div>
                    <p className="font-bold">
                      CPF
                    </p>

                    <p>
                      {selectedExam.cpf}
                    </p>
                  </div>

                  <div>
                    <p className="font-bold">
                      Telefone
                    </p>

                    <p>
                      {selectedExam.telefone}
                    </p>
                  </div>

                  <div>
                    <p className="font-bold">
                      Data Nascimento
                    </p>

                    <p>
                      {selectedExam.data_nascimento}
                    </p>
                  </div>

                  <div>
                    <p className="font-bold">
                      Data Coleta
                    </p>

                    <p>
                      {selectedExam.data_coleta}
                    </p>
                  </div>

                  <div>
                    <p className="font-bold">
                      Responsável
                    </p>

                    <p>
                      {selectedExam.responsavel}
                    </p>
                  </div>

                  <div>
                    <p className="font-bold">
                      Prioridade
                    </p>

                    <p>
                      {selectedExam.prioridade}
                    </p>
                  </div>

                  <div>
                    <p className="font-bold">
                      Status
                    </p>

                    <p>
                      {selectedExam.status}
                    </p>
                  </div>

                </div>

                <div className="mt-8">

                  <p className="font-bold mb-2">
                    Exames
                  </p>

                  <div className="bg-[#eef4ff] p-4 rounded-2xl">
                    {selectedExam.tipo_exame}
                  </div>

                </div>

                <div className="mt-8">

                  <p className="font-bold mb-2">
                    Observações
                  </p>

                  <div className="bg-[#eef4ff] p-4 rounded-2xl min-h-[100px]">
                    {selectedExam.observacoes}
                  </div>

                </div>

                <button
                  onClick={() =>
                    setSelectedExam(null)
                  }
                  className="mt-8 bg-red-500 hover:bg-red-600 text-white px-8 py-3 rounded-2xl"
                >
                  Fechar
                </button>

              </div>

            </div>

          )
        }

      </div>

    </MainLayout>

  )

}

export default Exams