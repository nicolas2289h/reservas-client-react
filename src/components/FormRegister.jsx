import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { BeatLoader } from "react-spinners";
import ModalMensajes from "./ModalMensajes";

const initialUserData = {
    nombre: '',
    apellido: '',
    email: '',
    username: '',
    password: '',
}

const URL_BASE = 'https://reservas-glitch-production.up.railway.app'

const FormRegister = () => {
    const [formData, setFormData] = useState(initialUserData)
    const [texto, setTexto] = useState('')
    const [showModal, setShowModal] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const navigate = useNavigate()

    const mostrarModalMensaje = (textoModal) => {
        setShowModal(true)
        setTexto(textoModal)
    }

    const handleRegister = e => {
        e.preventDefault()
        if (!formData.nombre.trim() || !formData.apellido.trim() || !formData.email.trim() || !formData.username.trim() || !formData.password.trim()) return mostrarModalMensaje('Debe completar todos los datos.')

        setLoading(true)
        axios.post(`${URL_BASE}/register`, formData)
            .then(response => {
                console.log(response.data)
                setFormData(initialUserData)
                navigate('/login')
            })
            .catch(error => setError(error.response.data.message))
            .finally(() => setLoading(false))
    }

    const handleChange = e => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-lg-3 col-md-6 col-sm-12 mx-auto">
                    <h3 className="mt-4">Registrar nuevo usuario</h3>

                    <form onSubmit={handleRegister} className="mx-auto mt-4 border p-4 rounded white-shadow">
                        <div className="mb-3">
                            <label htmlFor="nombre" className="">Nombre</label>
                            <input className="form-control" value={formData.nombre} type="text" name="nombre" onChange={handleChange} required autoFocus />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="apellido">Apellido</label>
                            <input className="form-control" value={formData.apellido} type="text" name="apellido" onChange={handleChange} required />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="email">Email</label>
                            <input className="form-control" value={formData.email} type="email" name="email" onChange={handleChange} required />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="username">Username</label>
                            <input className="form-control" value={formData.username} type="text" name="username" onChange={handleChange} required />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="password">Password</label>
                            <input className="form-control" minLength={4} value={formData.password} type="text" name="password" onChange={handleChange} required />
                        </div>

                        <div className="d-grid">
                            <button disabled={loading} className="btn btn-outline-primary w-100 text-white" type="submit">
                                {loading ? <BeatLoader className='mx-auto' size={10} color="#fff" /> : 'Registrar'}
                            </button>
                        </div>
                    </form>
                    <div className="text-center mt-3">
                        <p className="mt-4 mb-0">Ya tengo una cuenta.<Link className="text-decoration-none" to="/login"> <span className="text-white text-shadow">Iniciar Sesion</span></Link></p>
                    </div>
                    {error && <p className="text-center mensajeError">{error}</p>}
                    <ModalMensajes show={showModal} texto={texto} handleClose={() => setShowModal(false)} />
                </div>
            </div>
        </div>
    );
}

export default FormRegister;
