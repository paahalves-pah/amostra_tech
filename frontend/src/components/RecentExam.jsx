function RecentExam({ name, status }) {
  return (
    <div className="flex items-center justify-between bg-white p-4 rounded-xl shadow-sm border border-gray-100">

      <div>

        <h3 className="font-semibold">
          {name}
        </h3>

        <p className="text-sm text-gray-500">
          Resultado disponível
        </p>

      </div>

      <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-sm">
        {status}
      </span>

    </div>
  )
}

export default RecentExam