import React from 'react'

const SobreNosotros = () => {
    const nombreRestaurant = 'El Mirador'

    return (
        <div className='container container-home'>
            <div className="row">
                <div className="col-sm-12 col-md-6 mx-auto">
                    <div className=''>
                        <p className='text-justify'>
                            En la localidad de San Antonio, ubicada en la provincia de Jujuy, vas a encontrar nuestro rincón culinario dedicado a las delicias más reconfortantes. Somos más que un salón de té, somos un lugar donde la buena comida y la buena compañía se unen para crear momentos inolvidables.
                        </p>
                        <p className='text-justify'>
                            En {nombreRestaurant}, la calidad es nuestra prioridad. Desde nuestros panes horneados en casa hasta ingredientes frescos de la región, cada elemento de nuestros platos está cuidadosamente seleccionado para brindarle una experiencia excepcional.
                        </p>
                        <p className='text-justify'>
                            Pero no se trata solo de la comida. Nos esforzamos por crear un ambiente amigable donde puedas relajarte y disfrutar, rodeado de un paisaje rodeado de un paisaje que cautiva con sus montañas imponentes y valles que inspiran tranquilidad y paz.. Nuestro equipo amable y atento está para asegurarse de que tu visita sea inolvidable, ya sea que esté buscando una merienda con amigos o una celebración especial en familia.
                            Te esperamos para darte la bienvenida.
                            ¡Nos vemos pronto en {nombreRestaurant}!
                        </p>
                        <p className='text-center fs-2 text-shadow'>
                            🧉🥞🍰
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SobreNosotros