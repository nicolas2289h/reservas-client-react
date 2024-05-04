import React, { useState } from 'react'
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react'
import axios from 'axios';
import ModalTerminosCondiciones from '../components/ModalTerminosCondiciones';

const URL_BASE = 'https://cosmic-denim-farm.glitch.me'

const Eventos = () => {
    const [preferenceId, setPreferenceId] = useState(null)
    const [loading, setLoading] = useState(false)
    const [showModal, setShowModal] = useState(false)

    initMercadoPago('TEST-30ae09c9-f3d6-4383-bb71-f735fd3fe00f', {
        locale: 'es-AR'
    })

    const createPreference = () => {
        setLoading(true)
        axios.post(`${URL_BASE}/reserva/create-preference`, {
            title: 'Evento Especial',
            quantity: 1,
            price: 100
        })
            .then(response => {
                const { id } = response.data;
                setPreferenceId(id); // Actualiza el estado con el ID de preferencia
            })
            .catch(error => console.log(error.response.data))
            .finally(() => setLoading(false))
    }


    const handleSubmit = e => {
        e.preventDefault()
        const id = createPreference()

        if (id) {
            setPreferenceId(id)
        }
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-lg-5 col-md-8 col-sm-12 mx-auto">
                    <h4 className='text-center mt-4'>Reservar el Salón para un Evento</h4>
                    <form className='d-flex flex-column form-control gap-2 mx-auto mt-4 p-4' onSubmit={handleSubmit}>
                        {/* <h3 className='text-center'>Reservar el Salón para un Evento</h3> */}
                        <div className='form-group d-flex gap-2 wrap'>
                            <input required className='form-control' type="text" placeholder='Nombre' />
                            <input required className='form-control' type="text" placeholder='Apellido' />
                        </div>
                        <div className='form-group d-flex gap-2 wrap'>
                            <input required className='form-control' type="email" placeholder='Correo Electronico' />
                            <input required className='form-control' type="tel" pattern="[0-9]*" placeholder='Numero de Telefono' />
                        </div>
                        <div className='form-group d-flex gap-2 wrap'>
                            <input required className='form-control' type="date" placeholder='Fecha del Evento' />
                            <input required className='form-control' type="number" placeholder='Nro. de Invitados (Max. 100)' min={20} />
                        </div>
                        <textarea className='form-control resize-none' name="" id="" placeholder='Requisitos Dietéticos o Restricciones Alimenticias'></textarea>
                        <textarea className='form-control resize-none' name="" id="" placeholder='Comentarios o Notas Adicionales'></textarea>
                        <select className='border-none p-2' name="" id="" title='Metodos de Pago' required>
                            <option value="">Seleccionar Metodo de Pago</option>
                            <option value="mercadopago">Mercado Pago</option>
                        </select>
                        <div>
                            <input required className='cursor-pointer me-2' type="checkbox" id='politicas' />
                            <label className='cursor-pointer' htmlFor="politicas">Acepto los términos y condiciones.</label>
                            <span className='text-primary fw-bold cursor-pointer' onClick={() => setShowModal(true)}> Leer <i className="bi bi-box-arrow-up-right"></i></span>
                        </div>
                        <button className='btn btn-primary' disabled={loading}>{loading ? 'Cargando Método de Pago...' : 'Registrar Evento'}</button>
                        {
                            preferenceId &&
                            <Wallet initialization={{ preferenceId: preferenceId }} customization={{ texts: { valueProp: 'smart_option' } }} />
                        }
                    </form>

                    <ModalTerminosCondiciones show={showModal} handleClose={() => setShowModal(false)} />
                </div>
            </div>
        </div>
    )
}

export default Eventos