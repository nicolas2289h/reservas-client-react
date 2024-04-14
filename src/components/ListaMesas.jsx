import React from 'react'
import image from '../assets/img-mesa.png';


const ListaMesas = ({ listadoMesas, reservas, marcarReserva }) => {
    return (
        <div className='container-mesas mt-2 d-flex m-auto flex-wrap justify-content-evenly'>
            {listadoMesas.map(mesa => {
                const mesaReservada = reservas.some(reserva => reserva.nroMesa === mesa.id);
                return (
                    <div key={mesa.id} onClick={() => marcarReserva(mesa.id)} name='nroMesa' className={`box-mesa ${mesaReservada || !mesa.disponible ? 'ocupada' : 'libre'} `}>
                        <img src={image} alt={mesa.name} />
                        <p>{mesa.name}</p>
                    </div>
                );
            })}
        </div>
    );
}


export default ListaMesas
