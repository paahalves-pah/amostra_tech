import { useEffect } from "react"
import { useState } from "react"

import MainLayout from "../layouts/MainLayout"

import api from "../services/api"


const examesDisponiveis = [

  "Hemograma completo",
  "Glicemia de jejum",
  "Hemoglobina glicada (HbA1c)",
  "Colesterol total",
  "HDL",
  "LDL",
  "VLDL",
  "Triglicerídeos",
  "Ureia",
  "Creatinina",
  "Ácido úrico",
  "TGO (AST)",
  "TGP (ALT)",
  "Gama GT (GGT)",
  "Fosfatase alcalina",
  "Bilirrubina total e frações",
  "Sódio",
  "Potássio",
  "Cálcio",
  "Magnésio",
  "Fósforo",
  "TSH",
  "T4 livre",
  "Insulina",
  "Cortisol",
  "Testosterona",
  "Estrogênio",
  "Progesterona",
  "EAS (Urina tipo 1)",
  "Urocultura",
  "Parasitológico de fezes",
  "Pesquisa de sangue oculto nas fezes",
  "HIV",
  "Hepatites A, B e C",
  "VDRL (Sífilis)",
  "PCR (Proteína C Reativa)",
  "VHS",
  "Coagulograma",
  "Ferritina",
  "Ferro sérico",
  "Vitamina D",
  "Vitamina B12",
  "Dengue",
  "COVID-19"

]


function Coletas() {

  const [exams, setExams] =
    useState([])

  const [editingId, setEditingId] =
    useState(null)

  const [selectedExam, setSelectedExam] =
    useState(null)

  const [search, setSearch] =
  useState("")

  const [statusFilter, setStatusFilter] =
    useState("TODOS")

  const [prioridadeFilter, setPrioridadeFilter] =
    useState("TODAS")


  const [paciente, setPaciente] =
    useState("")

  const [cpf, setCpf] =
    useState("")

  const [dataNascimento, setDataNascimento] =
    useState("")

  const [telefone, setTelefone] =
    useState("")

  const [tipoExame, setTipoExame] =
    useState([])

  const [prioridade, setPrioridade] =
    useState("NORMAL")

  const [responsavel, setResponsavel] =
    useState("")

  const [observacoes, setObservacoes] =
    useState("")

  const [dataColeta, setDataColeta] =
    useState("")


  async function loadExams() {

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

    loadExams()

  }, [])


  function handleSelectExam(exame) {

    if (tipoExame.includes(exame)) {

      setTipoExame(
        tipoExame.filter(
          item => item !== exame
        )
      )

    }

    else {

      setTipoExame([
        ...tipoExame,
        exame
      ])

    }

  }


  function resetForm() {

    setEditingId(null)

    setPaciente("")
    setCpf("")
    setDataNascimento("")
    setTelefone("")
    setTipoExame([])
    setPrioridade("NORMAL")
    setResponsavel("")
    setObservacoes("")
    setDataColeta("")

  }


  async function handleCreateOrUpdate() {

    try {

      // CAMPOS OBRIGATÓRIOS

if (
  !paciente ||
  !cpf ||
  !telefone ||
  tipoExame.length === 0
) {

  alert(
    "Preencha todos os campos obrigatórios."
  )

  return

}

// NOME

if (
  !/^[A-Za-zÀ-ÿ\s]+$/.test(
    paciente
  )
) {

  alert(
    "Nome do paciente deve conter apenas letras."
  )

  return

}

// CPF

if (
  !/^\d{11}$/.test(cpf)
) {

  alert(
    "CPF deve conter exatamente 11 números."
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

// RESPONSÁVEL

if (
  responsavel &&
  !/^[A-Za-zÀ-ÿ\s]+$/.test(
    responsavel
  )
) {

  alert(
    "Responsável deve conter apenas letras."
  )

  return

}

      if (editingId) {

        await api.put(
          `/exams/${editingId}`,
          {

            paciente,

            cpf,

            data_nascimento: dataNascimento,

            telefone,

            tipo_exame: tipoExame.join(", "),

            status: "PENDENTE",

            prioridade,

            responsavel,

            observacoes,

            data_coleta: dataColeta

          }
        )

        alert(
          "Coleta atualizada!"
        )

      }

      else {

        const response = await api.post(
          "/exams",
          {

            paciente,

            cpf,

            data_nascimento: dataNascimento,

            telefone,

            tipo_exame: tipoExame.join(", "),

            prioridade,

            responsavel,

            observacoes,

            data_coleta: dataColeta

          }
        )

        alert(
          `Coleta cadastrada!\n\nProtocolo: ${response.data.protocolo}`
        )

      }

      resetForm()

      loadExams()

    } catch (error) {

      console.log(error)

      alert(
        "Erro ao salvar coleta"
      )

    }

  }


  function handleEditExam(exam) {

    setEditingId(exam.id)

    setPaciente(exam.paciente)

    setCpf(exam.cpf)

    setDataNascimento(
      exam.data_nascimento
    )

    setTelefone(exam.telefone)

    setTipoExame(
      exam.tipo_exame.split(", ")
    )

    setPrioridade(
      exam.prioridade
    )

    setResponsavel(
      exam.responsavel
    )

    setObservacoes(
      exam.observacoes
    )

    setDataColeta(
      exam.data_coleta
    )

  }


  async function handleDeleteExam(id) {

    const confirmar = confirm(
      "Excluir coleta?"
    )

    if (!confirmar) return

    try {

      await api.delete(
        `/exams/${id}`
      )

      loadExams()

    } catch (error) {

      console.log(error)

    }

  }


  async function handleChangeStatus(exam) {

    let novoStatus = "PENDENTE"

    if (exam.status === "PENDENTE") {

      novoStatus = "EM ANÁLISE"

    }

    else if (
      exam.status === "EM ANÁLISE"
    ) {

      novoStatus = "CONCLUÍDO"

    }

    try {

      await api.put(
        `/exams/${exam.id}`,
        {

          ...exam,

          status: novoStatus

        }
      )

      loadExams()

    } catch (error) {

      console.log(error)

    }

  }

  const filteredExams = exams.filter(
  (exam) => {

    const matchSearch =

      exam.paciente
        ?.toLowerCase()
        .includes(
          search.toLowerCase()
        )

      ||

      exam.protocolo
        ?.toLowerCase()
        .includes(
          search.toLowerCase()
        )

    const matchStatus =

      statusFilter === "TODOS"
      ||
      exam.status === statusFilter

    const matchPrioridade =

      prioridadeFilter === "TODAS"
      ||
      exam.prioridade === prioridadeFilter

    return (
      matchSearch &&
      matchStatus &&
      matchPrioridade
    )

  }
)

  return (

    <MainLayout>

      <div className="max-w-7xl mx-auto">

        {/* FORM */}
        <div className="bg-white rounded-3xl shadow-xl p-10 mb-10">

          <h1 className="text-5xl font-bold mb-10">

            {
              editingId
                ? "Editar Coleta"
                : "Nova Coleta"
            }

          </h1>

          <div className="grid grid-cols-2 gap-6">

            <input
              type="text"
              placeholder="Paciente"
              value={paciente}
              onChange={(e) =>
                setPaciente(e.target.value)
              }
              className="p-4 border rounded-2xl"
            />

            <input
              type="text"
              placeholder="CPF"
              value={cpf}
             onChange={(e) =>
                setCpf(
                  e.target.value.replace(
                    /\D/g,
                    ""
                  )
                )
              }
              className="p-4 border rounded-2xl"
            />

            <div className="flex flex-col">

              <label className="mb-2 font-semibold">
                Data de Nascimento
              </label>

              <input
                type="date"
                value={dataNascimento}
                onChange={(e) =>
                  setDataNascimento(e.target.value)
                }
                className="p-4 border rounded-2xl"
              />

            </div>

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
              className="p-4 border rounded-2xl"
            />

            <select
              value={prioridade}
              onChange={(e) =>
                setPrioridade(e.target.value)
              }
              className="p-4 border rounded-2xl"
            >

              <option value="NORMAL">
                NORMAL
              </option>

              <option value="URGENTE">
                URGENTE
              </option>

            </select>

            <input
              type="text"
              placeholder="Responsável"
              value={responsavel}
              onChange={(e) =>
                setResponsavel(e.target.value)
              }
              className="p-4 border rounded-2xl"
            />

            <div className="flex flex-col">

              <label className="mb-2 font-semibold">
                Data da Coleta
              </label>

              <input
                type="date"
                value={dataColeta}
                onChange={(e) =>
                  setDataColeta(e.target.value)
                }
                className="p-4 border rounded-2xl"
              />

            </div>

          </div>

          {/* EXAMES */}
          <div className="mt-10">

            <h2 className="text-3xl font-bold mb-6">
              Exames da Coleta
            </h2>

            <div className="grid grid-cols-2 gap-4 bg-[#eef4ff] p-6 rounded-2xl max-h-[450px] overflow-auto">

              {
                examesDisponiveis.map((exame) => (

                  <label
                    key={exame}
                    className="flex items-center gap-3 bg-white p-3 rounded-xl shadow-sm"
                  >

                    <input
                      type="checkbox"
                      checked={tipoExame.includes(exame)}
                      onChange={() =>
                        handleSelectExam(exame)
                      }
                    />

                    <span>
                      {exame}
                    </span>

                  </label>

                ))
              }

            </div>

          </div>

          <textarea
            placeholder="Observações"
            value={observacoes}
            onChange={(e) =>
              setObservacoes(e.target.value)
            }
            className="mt-8 w-full p-4 border rounded-2xl"
            rows={5}
          />

          <div className="flex gap-4 mt-8">

            <button
              onClick={handleCreateOrUpdate}
              className="bg-blue-500 hover:bg-blue-600 text-white px-10 py-4 rounded-2xl transition font-bold text-lg"
            >

              {
                editingId
                  ? "Salvar Alterações"
                  : "Cadastrar Coleta"
              }

            </button>

            {
              editingId && (

                <button
                  onClick={resetForm}
                  className="bg-gray-500 hover:bg-gray-600 text-white px-10 py-4 rounded-2xl transition font-bold text-lg"
                >
                  Cancelar
                </button>

              )
            }

          </div>

        </div>

        {/* LISTA */}
        <div className="bg-white rounded-3xl shadow-xl p-10">

          <h1 className="text-4xl font-bold mb-8">
              Lista de Coletas
            </h1>

            <div className="flex gap-4 mb-6">

              <input
                type="text"
                placeholder="Buscar paciente ou protocolo..."
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
                className="border p-3 rounded-xl flex-1"
              />

              <select
                value={statusFilter}
                onChange={(e) =>
                  setStatusFilter(
                    e.target.value
                  )
                }
                className="border p-3 rounded-xl"
              >
                <option value="TODOS">
                  Todos Status
                </option>

                <option value="PENDENTE">
                  Pendente
                </option>

                <option value="EM ANÁLISE">
                  Em Análise
                </option>

                <option value="CONCLUÍDO">
                  Concluído
                </option>

              </select>

              <select
                value={prioridadeFilter}
                onChange={(e) =>
                  setPrioridadeFilter(
                    e.target.value
                  )
                }
                className="border p-3 rounded-xl"
              >

                <option value="TODAS">
                  Todas Prioridades
                </option>

                <option value="NORMAL">
                  Normal
                </option>

                <option value="URGENTE">
                  Urgente
                </option>

              </select>

            </div>

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

                      <td className="p-4 flex gap-3">

                        <button
                          onClick={() =>
                            setSelectedExam(exam)
                          }
                          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-xl"
                        >
                          Visualizar
                        </button>

                        <button
                          onClick={() =>
                            handleEditExam(exam)
                          }
                          className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-xl"
                        >
                          Editar
                        </button>

                        <button
                          onClick={() =>
                            handleChangeStatus(exam)
                          }
                          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-xl"
                        >
                          Status
                        </button>

                        <button
                          onClick={() =>
                            handleDeleteExam(exam.id)
                          }
                          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl"
                        >
                          Excluir
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

    </MainLayout>

  )

}

export default Coletas