import MainLayout from "../layouts/MainLayout"

function Procedimentos() {

  const procedimentos = [

    { nome: "Hemograma Completo", icone: "🩸" },
    { nome: "Glicemia de Jejum", icone: "🍬" },
    { nome: "Hemoglobina Glicada (HbA1c)", icone: "🍭" },

    { nome: "Colesterol Total", icone: "❤️" },
    { nome: "HDL", icone: "❤️" },
    { nome: "LDL", icone: "❤️" },
    { nome: "VLDL", icone: "❤️" },
    { nome: "Triglicerídeos", icone: "❤️" },

    { nome: "Ureia", icone: "💧" },
    { nome: "Creatinina", icone: "💧" },
    { nome: "Ácido Úrico", icone: "💧" },

    { nome: "TGO (AST)", icone: "🫀" },
    { nome: "TGP (ALT)", icone: "🫀" },
    { nome: "Gama GT (GGT)", icone: "🫀" },
    { nome: "Fosfatase Alcalina", icone: "🫀" },
    { nome: "Bilirrubina Total e Frações", icone: "🫀" },

    { nome: "Sódio", icone: "⚡" },
    { nome: "Potássio", icone: "⚡" },
    { nome: "Cálcio", icone: "⚡" },
    { nome: "Magnésio", icone: "⚡" },
    { nome: "Fósforo", icone: "⚡" },

    { nome: "TSH", icone: "🦋" },
    { nome: "T4 Livre", icone: "🦋" },

    { nome: "Insulina", icone: "💉" },
    { nome: "Cortisol", icone: "🧬" },
    { nome: "Testosterona", icone: "🧬" },
    { nome: "Estrogênio", icone: "🧬" },
    { nome: "Progesterona", icone: "🧬" },

    { nome: "EAS (Urina Tipo 1)", icone: "🚽" },
    { nome: "Urocultura", icone: "🧫" },

    { nome: "Parasitológico de Fezes", icone: "🔬" },
    { nome: "Pesquisa de Sangue Oculto nas Fezes", icone: "🔎" },

    { nome: "HIV", icone: "🦠" },
    { nome: "Hepatites A, B e C", icone: "🦠" },
    { nome: "VDRL (Sífilis)", icone: "🦠" },

    { nome: "PCR (Proteína C Reativa)", icone: "🧪" },
    { nome: "VHS", icone: "🧪" },
    { nome: "Coagulograma", icone: "🩸" },

    { nome: "Ferritina", icone: "💊" },
    { nome: "Ferro Sérico", icone: "💊" },
    { nome: "Vitamina D", icone: "☀️" },
    { nome: "Vitamina B12", icone: "💊" },

    { nome: "Dengue", icone: "🦟" },
    { nome: "COVID-19", icone: "🦠" }

  ]

  return (

    <MainLayout>

      <h1 className="text-4xl font-bold mb-8">
        Manual de Coletas
      </h1>

      <div className="grid grid-cols-4 gap-6">

        {procedimentos.map((item) => (

          <div
            key={item.nome}
            className="
              bg-green-600
              hover:bg-green-700
              text-white
              rounded-3xl
              p-6
              shadow-xl
              hover:scale-105
              transition
              cursor-pointer
            "
          >

            <div className="text-5xl mb-4 text-center">
              {item.icone}
            </div>

            <h2 className="text-lg font-bold text-center min-h-[60px] flex items-center justify-center">
              {item.nome}
            </h2>

            <button
              className="
                mt-5
                w-full
                bg-white
                text-green-700
                py-2
                rounded-xl
                font-bold
              "
            >
              Ver Procedimento
            </button>

          </div>

        ))}

      </div>

    </MainLayout>

  )

}

export default Procedimentos