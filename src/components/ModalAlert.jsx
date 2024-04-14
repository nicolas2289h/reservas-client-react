import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const ModalAlert = ({ show, handleClose, cancelarReserva }) => {
    return (
        <Modal show={show} onHide={handleClose} className='text-black'>
            <Modal.Header closeButton>
                <Modal.Title>¿Estás seguro?</Modal.Title>
            </Modal.Header>
            <Modal.Body>Vas a perder tu reserva ☕🥐</Modal.Body>
            <Modal.Footer>
                <Button variant="danger" onClick={cancelarReserva}>
                    Sí, cancelar reserva
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ModalAlert;