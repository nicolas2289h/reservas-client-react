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

const FormReservas = () => {
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

    useEffect(()=>{
        setFormData({...formData, cliente: localStorage.getItem('username')})
    },[])

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

        axios.post('http://localhost:3000/reserva/guardar', formData, {
            headers: {
                Authorization: token
            }
        })
            .then(() => {
                setFormData(initialForm)
                window.location.reload()
            })
            .catch(error => {
                console.log(error.response)
                if (error.response && error.response.status === 403) {
                    mostrarModalMensaje('La sesion ha expirado, inicie sesion nuevamente.')
                    navigate('/') // Redireccionar al inicio de sesión si el token expiro
                }
            })
    }

    const listarReservas = (e) => {
        const fecha = e.target.value;
        setFormData({ ...formData, fecha });
        const token = localStorage.getItem('token')

        axios.get(`http://localhost:3000/reserva/listar?fecha=${fecha}`, {
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
                    navigate('/') // Redireccionar al inicio de sesión si el token expiro
                }
            })
    }

    return (
        <form className='form-reserva' action="" onSubmit={handleSubmit}>
            <div className='form-reserva-inputs'>
                <div className='width-fecha-horario d-flex justify-content-between align-items-center flex-column'>
                    <label htmlFor="fecha">Seleccioná una fecha</label>
                    <input min={fechaHoy} className='w-25 w-100 p-1' value={formData.fecha} name='fecha' id='fecha' type="date" onChange={listarReservas} required />
                </div>

                <div className='width-fecha-horario d-flex justify-content-between align-items-center flex-column'>
                    <label htmlFor="horario">Elegí un horario (8:00 a 19:00)</label>
                    <input className='w-25 w-100 p-1' min='08:00' max='19:00' value={formData.horario} name='horario' id='horario' type="time" onChange={handleChange} required />
                </div>
            </div>

            <ListaMesas listadoMesas={listadoMesas} reservas={reservas} marcarReserva={marcarReserva} />

            <div className='botonera text-center'>
                <button className='btn-reservar m-auto btn btn-primary'>Reservar</button>
                <button className='btn-limpiar m-auto btn btn-primary' onClick={() => window.location.reload()}>Limpiar</button>
            </div>

            <ModalMensajes show={showModal} texto={texto} handleClose={() => setShowModal(false)} />
        </form>
    )
}

export default FormReservas