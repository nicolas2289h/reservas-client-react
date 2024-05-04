import React, { useEffect, useState } from 'react'
import mesasData from '../utils/mesas.json'
import ListaMesas from './ListaMesas';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import ModalMensajes from './ModalMensajes';

const initialForm = {
    cliente: '',
    fecha: '',
    horario: '',
    nroMesa: null
}

const URL_BASE = 'https://cosmic-denim-farm.glitch.me'

const FormReservas = ({ username, obtenerReservasDelUsuario }) => {
    const [formData, setFormData] = useState(initialForm)
    const [listadoMesas, setListadoMesas] = useState(mesasData.mesas)
    const [reservas, setReservas] = useState([])
    const [texto, setTexto] = useState('')
    const [showModal, setShowModal] = useState(false)
    const navigate = useNavigate()

    // FECHA ACTUAL INICIAL PARA SETFECHA
    const configFecha = new Date()
    const mes = configFecha.getMonth() + 1    //Los meses inician en cero
    const mesActual = (mes < 10 ? '0' + mes : mes)
    const fechaHoy = `${configFecha.getFullYear()}-${mesActual}-${configFecha.getDate()}`

    useEffect(() => {
        setFormData({ ...formData, cliente: localStorage.getItem('username') })
    }, [])

    const mostrarModalMensaje = (textoModal) => {
        setShowModal(true)
        setTexto(textoModal)
    }

    const marcarReserva = (idMesa) => {
        if (!formData.fecha) return mostrarModalMensaje('Primero debes seleccionar una fecha para ver las mesas disponibles. 📆')
        setListadoMesas(listadoMesas.map(mesa => mesa.id == idMesa ? { ...mesa, disponible: !mesa.disponible } : { ...mesa, disponible: true }))
        setFormData({
            ...formData,
            nroMesa: idMesa
        })
    }

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!formData.horario || !formData.fecha) return mostrarModalMensaje('Debes completar todos los datos.')
        if (!formData.nroMesa) return mostrarModalMensaje('Debes seleccionar una mesa para tu reserva.')

        const token = localStorage.getItem('token')

        axios.post(`${URL_BASE}/reserva/guardar`, formData, {
            headers: {
                Authorization: token
            }
        })
            .then(() => {
                setFormData(initialForm)
                obtenerReservasDelUsuario(username)
            })
            .catch(error => {
                console.log(error.response)
                if (error.response && error.response.status === 403) {
                    mostrarModalMensaje('La sesion ha expirado, inicie sesion nuevamente.')
                    navigate('/login') // Redireccionar al inicio de sesión si el token expiro
                }
            })
    }

    const listarReservas = (e) => {
        const fecha = e.target.value;
        setFormData({ ...formData, fecha });
        const token = localStorage.getItem('token')

        axios.get(`${URL_BASE}/reserva/listar?fecha=${fecha}`, {
            headers: {
                Authorization: token
            }
        })
            .then(response => {
                setReservas(response.data.result)
            })
            .catch(error => {
                console.log(error.response)
                if (error.response && error.response.status === 403) {
                    mostrarModalMensaje('La sesion ha expirado, inicie sesion nuevamente.')
                    navigate('/login') // Redireccionar al inicio de sesión si el token expiro
                }
            })
    }

    return (
        <form className='form-control form-width' action="" onSubmit={handleSubmit}>
            <div className='d-flex justify-content-between shadow gap-2'>
                <div className='d-flex w-50 flex-column reserva-responsive'>
                    <label htmlFor="fecha">Seleccioná una fecha</label>
                    <input className='p-1 mb-2' min={fechaHoy} value={formData.fecha} name='fecha' id='fecha' type="date" onChange={listarReservas} required />
                </div>

                <div className='d-flex w-50 flex-column'>
                    <label htmlFor="horario">Elegí un horario (16:00 a 21:00)</label>
                    <input className='p-1 mb-2' min='16:00' max='21:00' value={formData.horario} name='horario' id='horario' type="time" onChange={handleChange} required />
                </div>
            </div>

            <ListaMesas listadoMesas={listadoMesas} reservas={reservas} marcarReserva={marcarReserva} />

            <div className='text-center mt-2'>
                <button className='m-auto btn btn-primary btn-width'>Reservar</button>
                {/* <button className='btn-limpiar m-auto btn btn-primary' onClick={() => window.location.reload()}>Limpiar</button> */}
            </div>

            <ModalMensajes show={showModal} texto={texto} handleClose={() => setShowModal(false)} />
        </form>
    )
}

export default FormReservas