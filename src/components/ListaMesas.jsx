import React from 'react'
import image from '../assets/img-mesa.png';


const ListaMesas = ({ listadoMesas, reservas, marcarReserva }) => {
    return (
        <div className='d-flex flex-wrap justify-content-evenly gap-1'>
            {listadoMesas.map(mesa => {
                const mesaReservada = reservas.some(reserva => reserva.nroMesa === mesa.id);
                return (
                    <div key={mesa.id} onClick={() => marcarReserva(mesa.id)} name='nroMesa' className={`position-relative ${mesaReservada || !mesa.disponible ? 'ocupada' : 'libre'} `}>
                        <span className='border nro-mesa position-absolute'>{mesa.id}</span>
                        <img width={100} src={image} alt={mesa.name} />
                        {/* <p className='text-center'>{mesa.name}</p> */}
                    </div>
                );
            })}
        </div>
    );
}

export default ListaMesas
