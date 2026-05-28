import { FlaskConical } from "lucide-react"

function ExamCard({ title, description }) {
  return (
    <div className="bg-[#dce6fb] p-5 rounded-2xl shadow hover:scale-105 transition cursor-pointer border border-[#c7d5f5]">

      <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center mb-4 shadow">

        <FlaskConical className="text-red-500" />

      </div>

      <h2 className="font-bold text-lg">
        {title}
      </h2>

      <p className="text-sm text-gray-500 mt-2">
        {description}
      </p>

    </div>
  )
}

export default ExamCard