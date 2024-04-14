import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import ModalMensajes from "./ModalMensajes";

const initialUserData = {
    nombre: '',
    apellido: '',
    email: '',
    username: '',
    password: '',
}

const FormRegister = () => {
    const [formData, setFormData] = useState(initialUserData)
    const [texto, setTexto] = useState('')
    const [showModal, setShowModal] = useState(false)
    const [error, setError] = useState('')
    const navigate = useNavigate()

    const mostrarModalMensaje = (textoModal) => {
        setShowModal(true)
        setTexto(textoModal)
    }

    const handleRegister = e => {
        e.preventDefault()
        if (!formData.nombre.trim() || !formData.apellido.trim() || !formData.email.trim() || !formData.username.trim() || !formData.password.trim()) return mostrarModalMensaje('Debe completar todos los datos.')

        axios.post('http://localhost:3000/register', formData)
            .then(response => {
                console.log(response.data)
                setFormData(initialUserData)
                navigate('/')
            })
            .catch(error => setError(error.response.data.message))
    }

    const handleChange = e => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    return (
        <div className="container__register text-center">
            <h3 className="mb-3">Registrar nuevo usuario</h3>

            <form onSubmit={handleRegister} className="form d-flex flex-column justify-content-center border">
                <div>
                    <input value={formData.nombre} type="text" name="nombre" onChange={handleChange} required placeholder="Nombre" autoFocus />
                </div>

                <div>
                    <input value={formData.apellido} type="text" name="apellido" onChange={handleChange} required placeholder="Apellido" />
                </div>

                <div>
                    <input value={formData.email} type="email" name="email" onChange={handleChange} required placeholder="Email" />
                </div>

                <div>
                    <input value={formData.username} type="text" name="username" onChange={handleChange} required placeholder="Username" />
                </div>

                <div>
                    <input minLength={4} value={formData.password} type="text" name="password" onChange={handleChange} required placeholder="Password" />
                </div>

                <div>
                    <button className="btn btn-outline-primary text-white btn-registrar">Registrar</button>
                </div>
            </form>
            <p className="mt-4 mb-0">Ya tengo una cuenta.<Link to="/"> <span className="span links-form">Iniciar Sesion</span></Link></p>
            {error && <p className="text-center mensajeError">{error}</p>}
            <ModalMensajes show={showModal} texto={texto} handleClose={() => setShowModal(false)} />
        </div>
    );
}

export default FormRegister;