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
import ChangePassword from "./pages/ChangePassword"


function PrivateRoute({ children }) {

  const token =
    localStorage.getItem("token")

  if (!token) {

    return <Navigate to="/" />

  }

  return children

}


function FirstAccessRoute({ children }) {

  const user = JSON.parse(
    localStorage.getItem("user")
  )

  if (
    user?.first_access === true
  ) {

    return (
      <Navigate to="/change-password" />
    )

  }

  return children

}


function AdminRoute({ children }) {

  const user = JSON.parse(
    localStorage.getItem("user")
  )

  if (
    user?.tipo_usuario !== "ADMIN"
  ) {

    return (
      <Navigate to="/dashboard" />
    )

  }

  return children

}


function App() {

  return (

    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={<Login />}
        />

        <Route
          path="/change-password"
          element={
            <PrivateRoute>

              <ChangePassword />

            </PrivateRoute>
          }
        />

        <Route
          path="/dashboard"
          element={
            <PrivateRoute>

              <FirstAccessRoute>

                <Dashboard />

              </FirstAccessRoute>

            </PrivateRoute>
          }
        />

        <Route
          path="/exams"
          element={
            <PrivateRoute>

              <FirstAccessRoute>

                <Exams />

              </FirstAccessRoute>

            </PrivateRoute>
          }
        />

        <Route
          path="/coletas"
          element={
            <PrivateRoute>

              <FirstAccessRoute>

                <Coletas />

              </FirstAccessRoute>

            </PrivateRoute>
          }
        />

        <Route
          path="/users"
          element={
            <PrivateRoute>

              <FirstAccessRoute>

                <AdminRoute>

                  <Users />

                </AdminRoute>

              </FirstAccessRoute>

            </PrivateRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <PrivateRoute>

              <FirstAccessRoute>

                <Profile />

              </FirstAccessRoute>

            </PrivateRoute>
          }
        />

        <Route
          path="*"
          element={<Navigate to="/" />}
        />

      </Routes>

    </BrowserRouter>

  )

}

export default App