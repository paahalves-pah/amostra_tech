import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom"

import Login from "../pages/Login"

import Home from "../pages/Home"

import Exams from "../pages/Exams"

import Users from "../pages/Users"

import ChangePassword from "../pages/ChangePassword"

import Profile from "../pages/Profile"

import PrivateRoute from "./PrivateRoute"

import AdminRoute from "./AdminRoute"


function AppRoutes() {

  return (

    <BrowserRouter>

      <Routes>

        {/* LOGIN */}
        <Route
          path="/"
          element={<Login />}
        />

        {/* HOME */}
        <Route
          path="/home"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />

        {/* EXAMES */}
        <Route
          path="/exams"
          element={
            <PrivateRoute>
              <Exams />
            </PrivateRoute>
          }
        />

        {/* PERFIL */}
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />

        {/* ALTERAR SENHA */}
        <Route
          path="/change-password"
          element={
            <PrivateRoute>
              <ChangePassword />
            </PrivateRoute>
          }
        />

        {/* USUÁRIOS */}
        <Route
          path="/users"
          element={
            <AdminRoute>
              <Users />
            </AdminRoute>
          }
        />

      </Routes>

    </BrowserRouter>

  )

}

export default AppRoutes