import Modal from 'react-bootstrap/Modal';
import React from 'react'

const ModalTerminosCondiciones = ({ show, handleClose }) => {
    return (
        <Modal show={show} onHide={handleClose} className='text-black'>
            <Modal.Header closeButton>
                <Modal.Title className='text-primary text-center'>Políticas de Cancelación y Reembolso</Modal.Title>
            </Modal.Header>
            <Modal.Body className='px-4'>
                <p>En "El Mirador Salón de Té", comprendemos que pueden surgir imprevistos que te impidan asistir a nuestro evento tras haber reservado. Por ello, hemos establecido estas políticas de cancelación y reembolso:</p>
                <div className='px-4'>
                    <p>✅ Cancelación con más de 7 días de antelación: Reembolso completo.</p>
                    <p>✅ Cancelación entre 3 y 7 días de antelación: Se retendrá el 50% del pago.</p>
                    <p>✅ Cancelación con menos de 3 días de antelación: Sin reembolso.</p>
                </div>

                <p>Para solicitar cancelación y reembolso, escríbenos a elmiradorsalondete@gmail.com con tus datos de reserva.</p>
                <p>Recuerda que los reembolsos pueden tardar en procesarse y reflejarse en tu cuenta bancaria o método de pago original.</p>
                <p>Para más información o preguntas, contactanos. Estamos aquí para ayudarte.</p>
            </Modal.Body>
        </Modal>
    )
}

export default ModalTerminosCondiciones