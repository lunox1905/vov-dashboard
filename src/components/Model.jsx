import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

// eslint-disable-next-line react/prop-types
function ModelComponent({ show =  true,title, body, handle, type, close}) {
    const typeText = type === 'delete' ? "Xóa" : "Lưu"
    const typeClass = type === 'delete' ? 'danger' : 'primary'
    return (
       
        <Modal show={show} onHide={close}>
            <Modal.Header closeButton>
            <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>{body}!</Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={close}>
                Close
            </Button>
            <Button variant={typeClass} onClick={handle}>
                {typeText}
            </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ModelComponent;