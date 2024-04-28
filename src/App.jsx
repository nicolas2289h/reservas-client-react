import { Route, Routes } from 'react-router-dom'
import Reservas from './pages/Reservas'
import Login from './pages/Login'
import Register from './pages/Register'
import './App.css'
import ProtectedRoute from './pages/ProtectedRoute'
import NavBar from './components/NavBar'
import Menu from './pages/Menu'
import Home from './pages/Home'
import EditarPerfil from './pages/EditarPerfil'
import SobreNosotros from './pages/SobreNosotros'

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path='/menu' element={<Menu />} />
        <Route path='/sobre-nosotros' element={<SobreNosotros />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/reservas" element={<Reservas />} />
          <Route path="/editar-perfil/:username" element={<EditarPerfil />} />
        </Route>
        <Route path="*" element={<h1>404 - Not Found</h1>} />
      </Routes>
    </>
  )
}

export default App