import MainLayout from "../layouts/MainLayout"
import Sidebar from "../components/Sidebar"
import ExamCard from "../components/ExamCard"
import RecentExam from "../components/RecentExam"

function Home() {
  return (
    <MainLayout>

      <div className="flex gap-8">

        <Sidebar />

        <div className="flex-1 flex flex-col gap-8">

          {/* Banner */}
          <div className="bg-[#b7c9f2] rounded-2xl p-8 shadow">

            <h1 className="text-3xl font-bold mb-2">
              Encontre instruções confiáveis
            </h1>

            <p className="text-gray-700 mb-6">
              Busque exames e protocolos.
            </p>

            <div className="flex gap-4">

              <input
                type="text"
                placeholder="Buscar exame..."
                className="flex-1 p-3 rounded-lg bg-white outline-none"
              />

              <button className="bg-blue-500 text-white px-6 rounded-lg">
                Buscar
              </button>

            </div>

          </div>

          {/* Cards */}
          <div>

            <h2 className="text-2xl font-bold mb-6">
              Acesso rápido
            </h2>

            <div className="grid grid-cols-3 gap-6">

              <ExamCard
                title="Hemograma"
                description="Coleta de sangue"
              />

              <ExamCard
                title="Urina Tipo 1"
                description="Coleta urinária"
              />

              <ExamCard
                title="Bacterioscopia"
                description="Análise microbiológica"
              />

            </div>

          </div>

          {/* Últimos exames */}
          <div>

            <h2 className="text-2xl font-bold mb-6">
              Últimos exames
            </h2>

            <div className="flex flex-col gap-4">

              <RecentExam
                name="Hemograma Completo"
                status="Concluído"
              />

              <RecentExam
                name="Urina Tipo 1"
                status="Em análise"
              />

              <RecentExam
                name="Bacterioscopia"
                status="Aguardando"
              />

            </div>

          </div>

        </div>

      </div>

    </MainLayout>
  )
}

export default Home