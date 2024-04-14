import { Route, Routes } from 'react-router-dom'
import Reservas from './pages/Reservas'
import Login from './pages/Login'
import Register from './pages/Register'
import './App.css'
import ProtectedRoute from './pages/ProtectedRoute'

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/reservas" element={<Reservas />} />
        </Route>
        <Route path="*" element={<h1>404 - Not Found</h1>} />
      </Routes>
    </>
  )
}

export default App