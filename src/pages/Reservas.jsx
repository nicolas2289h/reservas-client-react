import React, { useEffect, useState } from 'react'
import FormReservas from '../components/FormReservas';
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import ModalAlert from '../components/ModalAlert';
import BeatLoader from "react-spinners/BeatLoader";

const URL_BASE = 'https://cute-dove-jumpsuit.cyclic.app'

const Reservas = () => {
    const [listadoReservas, setListadoReservas] = useState([])
    const username = localStorage.getItem('username')
    const [showModal, setShowModal] = useState(false);
    const [reservaId, setReservaId] = useState(null);
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        setLoading(true)
        axios.get(`${URL_BASE}/reserva/cliente?username=${username}`)
            .then(response => setListadoReservas(response.data))
            .catch(error => console.log(error.response))
            .finally(() => setLoading(false))
    }, [])

    const modalCancelarReserva = (id) => {
        setReservaId(id)
        setShowModal(true)
    };

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

    const handleLogout = () => {
        localStorage.removeItem('username')
        localStorage.removeItem('token')
        navigate('/')
    }

    return (
        <div>

            <nav className='nav-reservas d-flex justify-content-between align-items-center'>
                <h2>Bienvenid@ {username}</h2>
                <button className='btn-volver text-white' onClick={handleLogout}>LogOut</button>
            </nav>

            <div className='seccion-reservas'>
                <h3 className='mb-3 text-center'>Aqui podrás reservar tu Merienda</h3>
                <div className='container-form-reserva d-flex justify-content-center flex-wrap gap-3'>
                    {
                        loading
                            ?
                            <BeatLoader color="#36d7b7" />
                            :
                            <>
                                <FormReservas />
                                <div className='container-listado-reservas'>
                                    <h3 className='text-center'>Mis reservas 📝</h3>
                                    <div>
                                        {listadoReservas.length == 0
                                            ?
                                            <h5>📆 Aún no tienes reservas</h5>
                                            :
                                            listadoReservas.map(item => (
                                                <div key={item.id} className='listado-reservas'>
                                                    <p>📆 {formatearFecha(item.fecha)} ⌚ Horario: {item.horario} ☕🥐 Mesa: {item.nroMesa}</p>
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