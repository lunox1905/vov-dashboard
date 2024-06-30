import React from 'react';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const ModelEditChannel = (props) => {
    // eslint-disable-next-line react/prop-types
    const { show, setShow,  channel, handleSubmitChannelName, handleAddStream,handleDeleteChannel } = props;
    // eslint-disable-next-line no-unused-vars
    const [currentScreen, setCurrentScreen] = useState('screen1');
    
    const UpdateChannel = () => {
        const [name, setName] = useState('')
        const [description, setDesciption] = useState("")
        return (
            <>
                <div className=''> 
                    <input
                        className='mr-2 my-2 border-1 w-[100%] h-[32px] rounded-sm p-2' 
                        type="text" 
                        placeholder='Tên kênh'
                        value={name} onChange={(e) => setName(e.target.value)}
                    />
                    <input
                        className='mr-2 my-2 border-1 w-[100%] h-[32px] rounded-sm p-2' 
                        type="text" 
                        placeholder='Mô tả' 
                        value={description} onChange={(e) => setDesciption(e.target.value)}
                    />
                    <p>Link Play HLS: {channel.linkHls}</p>
                    <Button className='mt-2' onClick={()=> handleSubmitChannelName({ name, description, id: channel.id })} >Cập nhật</Button>
                </div>

            </>
        )
    }
    const AddLinkStream = () => {
        const [newLinkStream, setNewLinkStream] = useState('')
        const [streamName, setStreamName] = useState("")
        return (<>
       
            <div className='flex'>
                <div className='flex flex-col w-screen gap-2'>

                <input className='mr-2 border-1 w-[60%] h-[32px] rounded-sm p-2' placeholder='Tên luồng' value={streamName} onChange={(e) => setStreamName(e.target.value)} />
                <input className='mr-2 border-1 w-[60%] h-[32px] rounded-sm p-2' type="text" placeholder='URL link stream' value={newLinkStream} onChange={(e) => setNewLinkStream(e.target.value)} />
                </div>

            <Button className='h-[50px]' onClick={() => handleAddStream({name: streamName, link: newLinkStream, channelId: channel.id})}>Thêm</Button>
        </div>
        </>)

    }
    const DeleteChannel = () => {
        return (<>
            <div className='flex justify-center'>

            <Button variant='danger' onClick={() => handleDeleteChannel({id: channel.id})}>Xóa kênh </Button>
            </div>
        </>)
    }

    const renderScreen = () => {
        switch (currentScreen) {
            case "screen1":
                return <UpdateChannel />;
            case "screen2":
                return <AddLinkStream />;
            case "screen3":
                return <DeleteChannel />;

        }
    }
    return (
        <Modal
            size="lg"
            show={show}
            onHide={() => setShow(false)}
            aria-labelledby="example-modal-sizes-title-lg" >
            <Modal.Header closeButton>
                <Modal.Title id="example-modal-sizes-title-lg">
                    Quản lý kênh
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>

                <ul className='flex justify-around'>
                    <li onClick={() => setCurrentScreen('screen1')} className="cursor-pointer  block p-2 text-sm font-semibold hover:underline rounded " >
                        Sửa kênh
                    </li>
                    <li onClick={() => setCurrentScreen('screen2')} className="cursor-pointer  block p-2 text-sm font-semibold hover:underline rounded ">
                        Thêm luồng stream
                    </li>
                    <li onClick={() => setCurrentScreen('screen3')} className="cursor-pointer  block p-2 text-sm font-semibold  hover:underline rounded " >
                        Xóa kênh
                    </li>
                </ul>
                <div className="p-4">
                    {renderScreen()}
                </div>
            
            </Modal.Body>
            <Modal.Footer>
            </Modal.Footer>
        </Modal>
    );
}

export default ModelEditChannel;
