import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom"

import Dashboard from "./pages/Dashboard"
import Exams from "./pages/Exams"
import Coletas from "./pages/Coletas"
import Users from "./pages/Users"
import Profile from "./pages/Profile"
import Login from "./pages/Login"


function App() {

  return (

    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={<Login />}
        />

        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

        <Route
          path="/exams"
          element={<Exams />}
        />

        <Route
          path="/coletas"
          element={<Coletas />}
        />

        <Route
          path="/users"
          element={<Users />}
        />

        <Route
          path="/profile"
          element={<Profile />}
        />

        <Route
          path="*"
          element={
            <Navigate to="/" />
          }
        />

      </Routes>

    </BrowserRouter>

  )

}

export default App