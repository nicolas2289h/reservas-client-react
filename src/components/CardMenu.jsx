import React from 'react'

const CardMenu = ({ item }) => {
    return (
        <div className="col-lg-2 col-md-6 col-sm-12">
            <div className="card text-white mt-4" style={{ background: `linear-gradient(#00000074, #00000197), url(${item.fondo})` }}>
                <div className='card-body text-center'>
                    {/* <h3 className='card-title'>{item.merienda}</h3> */}
                    <img className='w-100 mt-5 rounded' src={item.url} alt={item.merienda} />
                    {/* <p className='card-text bg-white text-black border rounded w-25'>${item.precio}</p> */}
                </div>
            </div>
        </div>
    )
}

export default CardMenu