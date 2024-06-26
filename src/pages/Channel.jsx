import { React ,useState ,useContext} from "react";
import { useEffect } from "react";
import { SocketContext } from "../context/SocketContext";
import Button from 'react-bootstrap/Button';
import Trash from "../assets/trash";
import EditIcon from "../assets/editIcon";
import DetailIcon from "../assets/detailIcon";
import ModelComponent from "../components/Model";
import ModelAddChannel from "../components/ModelAddChannel";
import { ChannelContext } from "../context/ChannelContext";

export const Channel = () => {
    const { socket } = useContext(SocketContext);
    const { listChannel, createChannel } = useContext(ChannelContext);
    const [ listPro, setListPro] = useState([]);
    const [ openModel, setOpenModel ] = useState(false)
    const [ openModelAddChannel, setOpenModelAddChannel ] = useState(false)
    const [ dataDelete, setDataDelete ] = useState({
        id: "",
        name: ""
    })
    console.log(import.meta.env.VITE_URL)
    useEffect(() => {
        if (socket) {
            socket.on('connect', () => {
                console.log('Connected to socket server');
            });

            socket.emit('list-producer')
            socket.on('emit-list-producer', (data) => {
                console.log(data)
                setListPro(data)
            })

            socket.on('add-channel-directlink-success', () => {
                socket.emit('list-producer')
            })

            socket.on('emit-delete-producer-sucess', () => {
                socket.emit('list-producer')
            })
            // Cleanup on unmount
            return () => {
                socket.off('connect');
                socket.off('message');
            };
        }
    }, [socket]);

    useEffect(() => {
        listChannel()
        .then(res => {
            console.log(res)
        })
    }, []);

    const handleDelete = (channelId, id) => {
        setDataDelete({
            id,
            channelId
        })
        setOpenModel(true)
        console.log(dataDelete)
    }

    const deletePro = () => {
        console.log(dataDelete)
        socket.emit('delete-producer', { channelId: dataDelete.channelId ,id: dataDelete.id})
        setOpenModel(false)
    }

    const hanldeAddChannel = ({ name, description }) => {
        createChannel({name, description})
        .then(res => {
            console.log("RES::::", res)
        })
    } 

    const hanldeAddStream = ({ name, link, note, uid }) => {
        socket.emit('link-stream', { name, link, note, uid})
    } 

    return (
        <>
            {
                openModel && 
                <ModelComponent title="Xóa kênh"
                    body="Chắc chắc muốn xóa kênh này"
                    type="delete"
                    close={setOpenModel}
                    handle={deletePro}
                />

            }
        <ModelAddChannel show={openModelAddChannel} setShow={setOpenModelAddChannel} handle={hanldeAddChannel}/>
        <div className="w-11/12">
            
            <div className="w-11/12 flex justify-between my-10">
                <h1>Quản lý kênh</h1>
                <Button variant="primary" onClick={() => setOpenModelAddChannel(true)}>Thêm kênh</Button>
            </div>
            <table className="w-11/12 border-collapse table-auto">
                <thead>
                    <tr className="">
                        <th className="px-3">Tên kênh</th>
                        <th>Số luồng</th>
                        <th>Loại luồng</th>
                        <th>Trạng thái</th>
                        <th>Cổng</th>
                        <th>Mô tả</th>
                        <th className="text-center">Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        listPro?.map(item => (
                            <>
                            <tr key={item.name} className="h-12 border-t-2 px-3">
                                <td className="px-3 w-[150px]">{item.name}</td>
                                <td className="w-[120px]">{item.streams.length}</td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                            {
                                item.streams.map(pro => (
                                    <tr key={pro.name} className="h-12 border-t-2" style={{background: "rgb(240 242 245)"}}>
                                        <td className="px-3"></td>
                                        <td></td>
                                        <td className="w-[120px]">{pro.isMainInput ? 
                                            <Button size="sm" variant="outline-primary">Main</Button> : 
                                            <Button size="sm" variant="outline-success">Backup</Button>}
                                        </td>
                                        <td className="w-[120px]">{pro.isActive ?  
                                            <Button size="sm" variant="outline-primary">Play</Button> : 
                                            <Button size="sm" variant="outline-danger">Stop</Button>}</td>
                                        <td>{pro.port}</td>
                                        <td>{pro.descripton}</td>
                                        <td className="w-[120px]">
                                            <div className="w-full flex justify-around">
                                                <div>
                                                    <EditIcon/>
                                                </div>
                                                <div>
                                                <DetailIcon/>
                                                </div>
                                                <div onClick={() => handleDelete(item.id, pro.id)}>
                                                    <Trash/>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            }
                            </>
                        ))
                    }
                    
                </tbody>
            </table>
            
        </div>
        </>
        
    )
}
