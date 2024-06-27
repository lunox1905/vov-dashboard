import React, { useEffect } from 'react';
import { useState ,useRef} from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const ModelEditChannel = (props) => {
    const { show, setShow,  channel, handleSubmitChannelName, handleAddStream,handleDeleteChannel } = props
    const [tempChannelName, setTempChannelName] = useState("")
    const [currentScreen, setCurrentScreen] = useState('screen1');
    const [newLinkStream, setNewLinkStream] = useState('')
    const [streamName, setStreamName] = useState("")
    const inputChannelName=useRef(null)
    useEffect(() => {
        if (channel?.name&& inputChannelName?.current?.value) {
            inputChannelName.current.value=channel.name
        }
    }, [show])

    const updateChannelName = () => {
        handleSubmitChannelName(channel.id,inputChannelName.current.value)
    }
    const ChannelName = () => {
        return (
            <>
                <div className='flex'> 
                    <input
                    ref={inputChannelName}
                        className='mr-2 border-1 w-[60%] h-[32px] rounded-sm p-2' type="text" placeholder='Tên kênh'  />
                    <Button onClick={()=> updateChannelName()} >Cập nhật</Button>
                </div>

            </>
        )
    }
    const AddLinkStream = () => {
        return (<>
       
            <div className='flex'>
                <div className='flex flex-col w-screen gap-2'>

                <input className='mr-2 border-1 w-[60%] h-[32px] rounded-sm p-2' type="text" placeholder='Tên luồng' value={streamName} onChange={(e) => setStreamName(e.target.value)} />
                <input className='mr-2 border-1 w-[60%] h-[32px] rounded-sm p-2' type="text" placeholder='URL link stream' value={newLinkStream} onChange={(e) => setNewLinkStream(e.target.value)} />
                </div>

            <Button className='h-[50px]'>Thêm</Button>
        </div>
        </>)

    }
    const DeleteChannel = () => {
        return (<>
            <div className='flex justify-center'>

            <Button variant='danger'>Xóa kênh </Button>
            </div>
        </>)
    }

    const renderScreen = () => {
        switch (currentScreen) {
            case "screen1":
                return <ChannelName />;
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
                        Tên kênh
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
