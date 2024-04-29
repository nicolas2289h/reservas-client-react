import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import BeatLoader from "react-spinners/BeatLoader";
import axios from 'axios'

const initialFormValues = {
    id: null,
    nombre: '',
    apellido: '',
    email: '',
    username: ''
}

const URL_BASE = 'https://enchanted-east-close.glitch.me'

const EditarPerfil = () => {
    const { username } = useParams()
    const [datosUsuario, setDatosUsuario] = useState(initialFormValues)
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        setLoading(true)
        axios.get(`${URL_BASE}/user/${username}`)
            .then(response => {
                setDatosUsuario(response.data)
            })
            .catch(error => console.log(error.response.data))
            .finally(() => setLoading(false))
    }, [])

    const handleChange = e => {
        setDatosUsuario({
            ...datosUsuario,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = e => {
        e.preventDefault()
        setLoading(true)

        axios.put(`${URL_BASE}/user/${datosUsuario.id}`, datosUsuario)
            .then(response => {
                console.log(response.data)
                setDatosUsuario(response.data)
                localStorage.setItem('username', response.data)
            })
            .catch(error => console.log(error.response.data))
            .finally(() => {
                setLoading(false)
                navigate('/')
            })
    }

    return (
        <div className='container'>
            <div className='row'>
                <div className='col-sm-12 col-md-4 mx-auto'>
                    <h4 className='text-center mt-4'>Editar Mi Perfil</h4>
                    {
                        loading ?
                            <BeatLoader className='mx-auto text-center' size={10} color="#fff" />
                            :
                            <form onSubmit={handleSubmit} className='mx-auto mt-4 white-shadow p-4 rounded'>
                                <div className='mb-3'>
                                    <label htmlFor="nombre" className="form-label">Nombre</label>
                                    <input className='form-control' type="text" id='nombre' name='nombre' value={datosUsuario.nombre} onChange={handleChange} />
                                </div>
                                <div className='mb-3'>
                                    <label htmlFor="apellido" className="form-label">Apellido</label>
                                    <input className='form-control' type="text" id='apellido' name='apellido' value={datosUsuario.apellido} onChange={handleChange} />
                                </div>
                                <div className='mb-3'>
                                    <label htmlFor="email" className="form-label">Email</label>
                                    <input className='form-control' type="email" id='email' name='email' value={datosUsuario.email} onChange={handleChange} />
                                </div>
                                <div className='mb-3'>
                                    <label htmlFor="username" className="form-label">Nombre de usuario</label>
                                    <input className='form-control' type="text" id='username' name='username' value={datosUsuario.username} onChange={handleChange} />
                                </div>
                                <div className='d-grid'>
                                    <button className='btn btn-primary'>Actualizar</button>
                                </div>
                            </form>
                    }
                </div>
            </div>
        </div>
    )
}

export default EditarPerfil