import { useState } from "react"
import MainLayout from "../layouts/MainLayout"

function Procedimentos() {

  const [search, setSearch] =
  useState("")

  const [selectedProcedure, setSelectedProcedure] =
  useState(null)

  const procedimentos = [

    
        {
          nome: "Hemograma Completo",
          icone: "🩸",
          preparo: "Não necessita jejum.",
          material: "Tubo EDTA Roxo.",
          procedimento: "Realizar coleta venosa, homogeneizar o tubo e encaminhar ao setor.",
          observacao: "Processar a amostra em até 2 horas."
        },

        {
          nome: "Glicemia de Jejum",
          icone: "🍬",
          preparo: "Jejum obrigatório de 8 horas.",
          material: "Tubo Fluoreto.",
          procedimento: "Confirmar o tempo de jejum antes da coleta e realizar punção venosa.",
          observacao: "Registrar o tempo de jejum informado pelo paciente."
        },

        {
          nome: "Hemoglobina Glicada (HbA1c)",
          icone: "🍭",
          preparo: "Não necessita jejum.",
          material: "Tubo EDTA Roxo.",
          procedimento: "Realizar coleta venosa e homogeneizar adequadamente o tubo.",
          observacao: "Exame utilizado para monitoramento do diabetes."
        },

        {
          nome: "Colesterol Total",
          icone: "❤️",
          preparo: "Jejum de 12 horas quando solicitado pelo médico.",
          material: "Tubo Gel Separador.",
          procedimento: "Realizar coleta venosa seguindo protocolo padrão.",
          observacao: "Evitar consumo de álcool 72 horas antes."
        },

        {
          nome: "HDL",
          icone: "❤️",
          preparo: "Jejum de 12 horas.",
          material: "Tubo Gel Separador.",
          procedimento: "Realizar coleta venosa e encaminhar ao setor técnico.",
          observacao: "Pode ser solicitado juntamente com perfil lipídico."
        },

        {
          nome: "LDL",
          icone: "❤️",
          preparo: "Jejum de 12 horas.",
          material: "Tubo Gel Separador.",
          procedimento: "Realizar coleta venosa conforme rotina laboratorial.",
          observacao: "Avaliação do risco cardiovascular."
        },

        {
          nome: "VLDL",
          icone: "❤️",
          preparo: "Jejum de 12 horas.",
          material: "Tubo Gel Separador.",
          procedimento: "Realizar coleta venosa e encaminhar para análise.",
          observacao: "Normalmente calculado junto ao perfil lipídico."
        },

        {
          nome: "Triglicerídeos",
          icone: "❤️",
          preparo: "Jejum obrigatório de 12 horas.",
          material: "Tubo Gel Separador.",
          procedimento: "Confirmar jejum antes da coleta e realizar punção venosa.",
          observacao: "Evitar atividade física intensa no dia anterior."
        },

        {
          nome: "Ureia",
          icone: "💧",
          preparo: "Não necessita jejum.",
          material: "Tubo Gel Separador.",
          procedimento: "Realizar coleta venosa seguindo protocolo padrão.",
          observacao: "Avaliação da função renal."
        },

        {
          nome: "Creatinina",
          icone: "💧",
          preparo: "Não necessita jejum.",
          material: "Tubo Gel Separador.",
          procedimento: "Realizar coleta venosa e encaminhar ao setor técnico.",
          observacao: "Importante para avaliação da função renal."
        },
        {
          nome: "Ácido Úrico",
          icone: "💧",
          preparo: "Jejum de 4 horas recomendado.",
          material: "Tubo Gel Separador.",
          procedimento: "Realizar coleta venosa seguindo protocolo padrão.",
          observacao: "Importante para investigação de gota e alterações metabólicas."
        },

        {
          nome: "TGO (AST)",
          icone: "🫀",
          preparo: "Jejum de 8 horas recomendado.",
          material: "Tubo Gel Separador.",
          procedimento: "Realizar coleta venosa e encaminhar para análise bioquímica.",
          observacao: "Utilizado na avaliação hepática e muscular."
        },

        {
          nome: "TGP (ALT)",
          icone: "🫀",
          preparo: "Jejum de 8 horas recomendado.",
          material: "Tubo Gel Separador.",
          procedimento: "Realizar coleta venosa conforme protocolo laboratorial.",
          observacao: "Exame importante para avaliação da função hepática."
        },

        {
          nome: "Gama GT (GGT)",
          icone: "🫀",
          preparo: "Jejum de 8 horas.",
          material: "Tubo Gel Separador.",
          procedimento: "Realizar coleta venosa seguindo técnica asséptica.",
          observacao: "Evitar consumo de álcool nas 72 horas anteriores."
        },

        {
          nome: "Fosfatase Alcalina",
          icone: "🫀",
          preparo: "Jejum de 8 horas.",
          material: "Tubo Gel Separador.",
          procedimento: "Realizar coleta venosa e encaminhar ao setor técnico.",
          observacao: "Auxilia na avaliação hepática e óssea."
        },

        {
          nome: "Bilirrubina Total e Frações",
          icone: "🫀",
          preparo: "Jejum de 4 horas recomendado.",
          material: "Tubo Gel Separador.",
          procedimento: "Realizar coleta venosa e proteger a amostra da luz.",
          observacao: "Importante para avaliação hepática e icterícia."
        },

        {
          nome: "Sódio",
          icone: "⚡",
          preparo: "Não necessita jejum.",
          material: "Tubo Gel Separador.",
          procedimento: "Realizar coleta venosa conforme rotina laboratorial.",
          observacao: "Avaliação do equilíbrio hidroeletrolítico."
        },

        {
          nome: "Potássio",
          icone: "⚡",
          preparo: "Não necessita jejum.",
          material: "Tubo Gel Separador.",
          procedimento: "Realizar coleta evitando hemólise da amostra.",
          observacao: "Hemólise pode alterar o resultado."
        },

        {
          nome: "Cálcio",
          icone: "⚡",
          preparo: "Jejum de 4 horas recomendado.",
          material: "Tubo Gel Separador.",
          procedimento: "Realizar coleta venosa e encaminhar ao setor.",
          observacao: "Utilizado na avaliação metabólica e óssea."
        },

        {
          nome: "Magnésio",
          icone: "⚡",
          preparo: "Jejum de 4 horas recomendado.",
          material: "Tubo Gel Separador.",
          procedimento: "Realizar coleta venosa seguindo protocolo padrão.",
          observacao: "Importante para avaliação eletrolítica."
        },
        
        {
          nome: "Fósforo",
          icone: "⚡",
          preparo: "Jejum de 4 horas recomendado.",
          material: "Tubo Gel Separador.",
          procedimento: "Realizar coleta venosa seguindo protocolo padrão.",
          observacao: "Importante na avaliação óssea e renal."
        },

        {
          nome: "TSH",
          icone: "🦋",
          preparo: "Não necessita jejum.",
          material: "Tubo Gel Separador.",
          procedimento: "Realizar coleta venosa conforme rotina laboratorial.",
          observacao: "Utilizado na avaliação da função tireoidiana."
        },

        {
          nome: "T4 Livre",
          icone: "🦋",
          preparo: "Não necessita jejum.",
          material: "Tubo Gel Separador.",
          procedimento: "Realizar coleta venosa seguindo protocolo padrão.",
          observacao: "Frequentemente solicitado juntamente com TSH."
        },

        {
          nome: "Insulina",
          icone: "💉",
          preparo: "Jejum obrigatório de 8 horas.",
          material: "Tubo Gel Separador.",
          procedimento: "Confirmar jejum antes da coleta e realizar punção venosa.",
          observacao: "Importante para avaliação metabólica e resistência à insulina."
        },

        {
          nome: "Cortisol",
          icone: "🧬",
          preparo: "Seguir horário solicitado pelo médico.",
          material: "Tubo Gel Separador.",
          procedimento: "Realizar coleta no horário indicado na solicitação médica.",
          observacao: "Os níveis variam ao longo do dia."
        },

        {
          nome: "Testosterona",
          icone: "🧬",
          preparo: "Preferencialmente coleta pela manhã.",
          material: "Tubo Gel Separador.",
          procedimento: "Realizar coleta venosa conforme rotina laboratorial.",
          observacao: "Os níveis hormonais apresentam variação diária."
        },

        {
          nome: "Estrogênio",
          icone: "🧬",
          preparo: "Seguir orientação médica quanto ao período do ciclo.",
          material: "Tubo Gel Separador.",
          procedimento: "Realizar coleta venosa e encaminhar ao setor técnico.",
          observacao: "Pode ser solicitado em diferentes fases do ciclo menstrual."
        },

        {
          nome: "Progesterona",
          icone: "🧬",
          preparo: "Seguir orientação médica.",
          material: "Tubo Gel Separador.",
          procedimento: "Realizar coleta venosa conforme protocolo.",
          observacao: "Importante para avaliação hormonal feminina."
        },

        {
          nome: "EAS (Urina Tipo 1)",
          icone: "🚽",
          preparo: "Utilizar a primeira urina da manhã quando possível.",
          material: "Frasco estéril.",
          procedimento: "Realizar higiene íntima e coletar jato médio.",
          observacao: "Entregar ao laboratório em até 2 horas após a coleta."
        },

        {
          nome: "Urocultura",
          icone: "🧫",
          preparo: "Realizar higiene íntima antes da coleta.",
          material: "Frasco estéril para cultura.",
          procedimento: "Coletar jato médio da urina em recipiente apropriado.",
          observacao: "Evitar iniciar antibióticos antes da coleta, salvo orientação médica."
        },

        {
          nome: "Parasitológico de Fezes",
          icone: "🔬",
          preparo: "Não utilizar laxantes nas 72 horas anteriores.",
          material: "Frasco coletor apropriado.",
          procedimento: "Coletar pequena quantidade de fezes em recipiente adequado.",
          observacao: "Evitar contaminação com urina ou água."
        },



        {
          nome: "Pesquisa de Sangue Oculto nas Fezes",
          icone: "🔎",
          preparo: "Seguir orientação médica sobre dieta quando solicitado.",
          material: "Frasco coletor apropriado.",
          procedimento: "Coletar amostra de fezes em recipiente adequado.",
          observacao: "Evitar contaminação com urina ou água."
        },

            {
              nome: "HIV",
              icone: "🦠",
              preparo: "Não necessita jejum.",
              material: "Tubo Gel Separador.",
              procedimento: "Realizar coleta venosa seguindo protocolo padrão.",
              observacao: "Garantir sigilo e identificação correta da amostra."
            },

            {
              nome: "Hepatites A, B e C",
              icone: "🦠",
              preparo: "Não necessita jejum.",
              material: "Tubo Gel Separador.",
              procedimento: "Realizar coleta venosa conforme rotina laboratorial.",
              observacao: "Exame sorológico para investigação de hepatites virais."
            },

            {
              nome: "VDRL (Sífilis)",
              icone: "🦠",
              preparo: "Não necessita jejum.",
              material: "Tubo Gel Separador.",
              procedimento: "Realizar coleta venosa e encaminhar para análise.",
              observacao: "Utilizado para rastreamento e acompanhamento da sífilis."
            },

            {
              nome: "PCR (Proteína C Reativa)",
              icone: "🧪",
              preparo: "Não necessita jejum.",
              material: "Tubo Gel Separador.",
              procedimento: "Realizar coleta venosa seguindo protocolo padrão.",
              observacao: "Importante marcador inflamatório."
            },

            {
              nome: "VHS",
              icone: "🧪",
              preparo: "Não necessita jejum.",
              material: "Tubo Citrato ou EDTA conforme metodologia.",
              procedimento: "Realizar coleta venosa e encaminhar rapidamente ao setor.",
              observacao: "Utilizado na investigação de processos inflamatórios."
            },

            {
              nome: "Coagulograma",
              icone: "🩸",
              preparo: "Não necessita jejum.",
              material: "Tubo Citrato Azul.",
              procedimento: "Realizar coleta respeitando o volume correto do tubo.",
              observacao: "A proporção sangue/anticoagulante deve ser mantida."
            },

            {
              nome: "Ferritina",
              icone: "💊",
              preparo: "Jejum de 4 horas recomendado.",
              material: "Tubo Gel Separador.",
              procedimento: "Realizar coleta venosa conforme rotina laboratorial.",
              observacao: "Utilizado na avaliação dos estoques de ferro."
            },

            {
              nome: "Ferro Sérico",
              icone: "💊",
              preparo: "Jejum de 8 horas recomendado.",
              material: "Tubo Gel Separador.",
              procedimento: "Realizar coleta preferencialmente pela manhã.",
              observacao: "Os níveis podem variar ao longo do dia."
            },

            {
              nome: "Vitamina D",
              icone: "☀️",
              preparo: "Não necessita jejum.",
              material: "Tubo Gel Separador.",
              procedimento: "Realizar coleta venosa seguindo protocolo padrão.",
              observacao: "Importante para avaliação metabólica e óssea."
            },
                {
              nome: "Vitamina B12",
              icone: "💊",
              preparo: "Jejum de 4 horas recomendado.",
              material: "Tubo Gel Separador.",
              procedimento: "Realizar coleta venosa seguindo protocolo padrão.",
              observacao: "Importante para avaliação hematológica e neurológica."
            },

            {
              nome: "Dengue",
              icone: "🦟",
              preparo: "Não necessita jejum.",
              material: "Tubo Gel Separador.",
              procedimento: "Realizar coleta venosa conforme solicitação médica e encaminhar ao setor de sorologia.",
              observacao: "Informar data de início dos sintomas no cadastro do paciente."
            },

            {
              nome: "COVID-19",
              icone: "🦠",
              preparo: "Não necessita preparo.",
              material: "Swab estéril ou tubo para coleta sanguínea conforme metodologia.",
              procedimento: "Realizar coleta conforme protocolo específico do exame solicitado.",
              observacao: "Utilizar EPIs durante todo o procedimento de coleta."
            },

  ]

    const procedimentosFiltrados =
      procedimentos.filter((item) =>
        item.nome
          .toLowerCase()
          .includes(
            search.toLowerCase()
          )
      )

  return (

    <MainLayout>

      <h1 className="text-4xl font-bold mb-8">
        Manual de Coletas
      </h1>

      <input
        type="text"
        placeholder="🔍 Buscar exame..."
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
        className="
          w-full
          mb-8
          p-4
          rounded-2xl
          border
          border-gray-300
          bg-white
          shadow
        "
      />

      <div className="grid grid-cols-4 gap-6">

        {procedimentosFiltrados.map((item) => (

          <div
            key={item.nome}
            className="
              bg-green-100
              hover:bg-green-200
              text-green-700
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
            
              onClick={() =>
                setSelectedProcedure(item)
              }
              className="
                mt-5
                w-full
                bg-green-600
                hover:bg-green-700
                text-white
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
{
  selectedProcedure && (

    <div
      className="
        fixed
        inset-0
        bg-black/50
        flex
        items-center
        justify-center
        z-50
      "
    >

      <div
        className="
          bg-white
          w-[700px]
          rounded-3xl
          p-8
          shadow-2xl
        "
      >

        <h2 className="text-3xl font-bold mb-6">
          {selectedProcedure.nome}
        </h2>

        <p className="mb-4">
          <strong>Preparo:</strong>
          {" "}
          {selectedProcedure.preparo}
        </p>

        <p className="mb-4">
          <strong>Material:</strong>
          {" "}
          {selectedProcedure.material}
        </p>

        <p className="mb-4">
          <strong>Procedimento:</strong>
          {" "}
          {selectedProcedure.procedimento}
        </p>

        <p className="mb-6">
          <strong>Observação:</strong>
          {" "}
          {selectedProcedure.observacao}
        </p>

        <button
          onClick={() =>
            setSelectedProcedure(null)
          }
          className="
            bg-red-500
            hover:bg-red-600
            text-white
            px-6
            py-3
            rounded-xl
          "
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

export default Procedimentos