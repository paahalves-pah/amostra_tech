import Sidebar from "../components/Sidebar"


function MainLayout({ children }) {

  return (

    <div className="min-h-screen bg-[#eef4ff]">

      <Sidebar />

      <div className="p-10">

        {children}

      </div>

    </div>

  )

}

export default MainLayout