import React, { useEffect } from 'react';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function ModelEditChannel(props) {
    const { show, setShow,channelName,handleSubmitChannelName, hlsLink} =props
    const [tempChannelName, setTempChannelName ]=useState("")
    useEffect(() => {
       setTempChannelName(channelName)
   },[show])
    return (
        <Modal
            size="lg"
            show={show}
            onHide={() => setShow(false)}
            aria-labelledby="example-modal-sizes-title-lg" >
            <Modal.Header closeButton>
            <Modal.Title id="example-modal-sizes-title-lg">
                Thông tin kênh
            </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className='flex w-8/10 p-2'>
                    <span className='w-[120px]'>Tên kênh :</span>
                    <input className='border-1 w-[80%] h-[32px] rounded-sm p-2' type="text" placeholder='Tên kênh' value={tempChannelName} onChange={(e) => setTempChannelName(e.target.value)} />
                    <Button onClick={()=>{ handleSubmitChannelName(tempChannelName,channelName)}} variant="primary" className='text-sm  ml-2 w-[120px]'>Lưu thay đổi </Button>
                </div>
                <div className='flex w-8/10 p-2'>
                    <span className='w-[120px]'>Hls link</span>
                    <input disabled className='border-1 w-[80%] h-[32px] rounded-sm p-2' type="text" placeholder='Tên kênh' value={hlsLink} onChange={(e) => {}} />
                </div>
                
                
            </Modal.Body>
            <Modal.Footer>
            </Modal.Footer>
        </Modal>
    );
}

export default ModelEditChannel;
