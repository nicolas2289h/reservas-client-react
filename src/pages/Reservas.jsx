import React, { useEffect, useState } from 'react'
import FormReservas from '../components/FormReservas';
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import ModalAlert from '../components/ModalAlert';
import BeatLoader from "react-spinners/BeatLoader";

// http://localhost:3000
const URL_BASE = 'https://cosmic-denim-farm.glitch.me'

const Reservas = () => {
    const [listadoReservas, setListadoReservas] = useState([])
    const username = localStorage.getItem('username')
    const [showModal, setShowModal] = useState(false);
    const [reservaId, setReservaId] = useState(null);
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        obtenerReservasDelUsuario(username)
    }, [])

    const obtenerReservasDelUsuario = (username) => {
        setLoading(true)
        axios.get(`${URL_BASE}/reserva/cliente?username=${username}`)
            .then(response => setListadoReservas(response.data))
            .catch(error => console.log(error.response))
            .finally(() => setLoading(false))
    }

    const modalCancelarReserva = (id) => {
        setReservaId(id)
        setShowModal(true)
    }

    const cancelarReserva = () => {
        axios.delete(`${URL_BASE}/reserva/eliminar/${reservaId}`)
            .then(() => {
                setListadoReservas(prevState => prevState.filter(item => item.id !== reservaId))
            })
            .catch(error => console.log(error.response))
        setShowModal(false)
    };

    const formatearFecha = (fechaReserva) => {
        const fechaFormateada = fechaReserva.split('-').reverse().join('-')
        return fechaFormateada
    }
    
    return (
        <div className='container'>
            <h3 className='text-center my-4'>Aqui podrás reservar tu Merienda</h3>

            <div className=''>
                <div className='d-flex gap-4 wrap-responsive justify-content-center'>
                    {
                        loading
                            ?
                            <BeatLoader className='mx-auto' color="#fff" />
                            :
                            <>
                                <FormReservas username={username} obtenerReservasDelUsuario={obtenerReservasDelUsuario} />
                                <div className='bg-white form-width text-black rounded container-mis-reservas-responsive'>
                                    <h3 className='text-center mt-3'>Mis reservas 📝</h3>
                                    <div className='mis-reservas-responsive'>
                                        {listadoReservas.length == 0
                                            ?
                                            <h5 className='ms-5'>📆 Aún no tienes reservas</h5>
                                            :
                                            listadoReservas.map(item => (
                                                <div key={item.id} className='py-2 border-bottom d-flex justify-content-evenly'>
                                                    <p className='text-dark'>📆 {formatearFecha(item.fecha)} ⌚ Horario: {item.horario} ☕🥐 Mesa: {item.nroMesa}</p>
                                                    <button onClick={() => modalCancelarReserva(item.id)} className='btn btn-danger'>Cancelar</button>
                                                </div>
                                            ))
                                        }
                                    </div>
                                </div>
                            </>
                    }
                </div>
            </div>
            <ModalAlert show={showModal} handleClose={() => setShowModal(false)} cancelarReserva={cancelarReserva} />
        </div>
    )
}

export default Reservas