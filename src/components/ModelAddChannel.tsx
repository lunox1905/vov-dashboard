import React from 'react';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function ModelAddChannel({ show, setShow, handle }) {
    const [ name, setName ] = useState('');
    const [ link, setLink ] = useState('');
    const [ note, setNote ] = useState('');
    const [ uid, setUid ] = useState('');

    const handleAdd = () => {
        handle({ name, link, note })
        setLink('')
        setName('')
        setNote('')
        setUid('')
        setShow(false)
    }
    return (
        <Modal
            size="lg"
            show={show}
            onHide={() => setShow(false)}
            aria-labelledby="example-modal-sizes-title-lg"
        >
            <Modal.Header closeButton>
            <Modal.Title id="example-modal-sizes-title-lg">
                Thêm luồng phát từ link
            </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className='flex w-8/10 p-2'>
                    <span className='w-[120px]'>Name</span>
                    <input className='border-1 w-[80%] h-[32px] rounded-sm p-2' type="text" placeholder='Tên kênh' value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                
                <div className='flex w-8/10 p-2'>
                    <span className='w-[120px]'>Link</span>
                    <input className='border-1 w-[80%] h-[32px] rounded-sm p-2' type="text" placeholder='Đường dẫn' value={link} onChange={(e) => setLink(e.target.value)} />
                </div>
                
                <div className='flex w-8/10 p-2'>
                    <span className='w-[120px]'>Note</span>
                    <input className='border-1 w-[80%] h-[32px] rounded-sm p-2' type="text" placeholder='Ghi chú' value={note} onChange={(e) => setNote(e.target.value)} />
                </div>

                <div className='flex w-8/10 p-2'>
                    <span className='w-[120px]'>Uid</span>
                    <input className='border-1 w-[80%] h-[32px] rounded-sm p-2' type="text" placeholder='Uid' value={uid} onChange={(e) => setUid(e.target.value)} />
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={() => handleAdd()}>Thêm</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ModelAddChannel;
