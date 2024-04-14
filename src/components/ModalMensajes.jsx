import Modal from 'react-bootstrap/Modal';

const ModalMensajes = ({ show, handleClose, texto }) => {
    return (
        <Modal show={show} onHide={handleClose} className='text-black'>
            <Modal.Header closeButton>
                <Modal.Title>Atención!</Modal.Title>
            </Modal.Header>
            <Modal.Body>{texto}</Modal.Body>
            <Modal.Footer />
        </Modal>
    )
}

export default ModalMensajes;