import React from 'react';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';

const ModalContacto = ({ show, handleClose }) => {
    return (
        <Modal show={show} onHide={handleClose} className='text-black' aria-labelledby="contained-modal-title-vcenter ">
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Te esperamos!
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className="grid-example">
                <Container>
                    <Row>
                        <Col xs={12} md={12}>
                            <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0 }}>
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3635.8919792678835!2d-65.403397!3d-24.3154027!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x941ba1f00ec4d97f%3A0x4e4f205d9ea8547e!2sEl%20Mirador%2C%20Restaurante%20-%20Bar!5e0!3m2!1sen!2sar!4v1714088898234!5m2!1sen!2sar"
                                    style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                                    allowFullScreen={true}
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                ></iframe>
                            </div>
                        </Col>
                        <Col xs={6} md={12}>
                            <p className='mt-4'><i className="bi bi-geo-alt text-danger"></i> RP N°2 - Km 22.5 - Los Morados, San Antonio, Jujuy</p>
                        </Col>
                        <Col xs={6} md={12}>
                            <p className=''><i className="bi bi-telephone-plus text-success"></i> Tel.: 0388 573-9885</p>
                        </Col>
                        <Col xs={6} md={12}>
                            <p className=''><i className="bi bi-clock-history"></i> Todos los días de 16 a 21</p>
                        </Col>
                        <Col xs={6} md={12}>
                            <p onClick={() => window.open('https://www.instagram.com/elmirador.sanantonio/')} className='cursor-pointer d-inline-block'><i className="bi bi-instagram icon-instagram"></i> Instagram</p>
                        </Col>
                        <Col xs={6} md={12}>
                            <p onClick={() => window.open('https:/www.facebook.com/El-Mirador-parrilla-101326781830425')} className='cursor-pointer d-inline-block'><i className="bi bi-facebook icon-facebook"></i> Facebook</p>
                        </Col>
                    </Row>
                </Container>
            </Modal.Body>
            {/* <Modal.Footer>
                <p>Mamapacha</p>
            </Modal.Footer> */}
        </Modal>
    );
}

export default ModalContacto;