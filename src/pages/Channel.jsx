import { useState ,useContext} from "react";
import { useEffect } from "react";
import { SocketContext } from "../context/SocketContext";
import Button from 'react-bootstrap/Button';

export const Channel = () => {
    const { socket } = useContext(SocketContext);
    const [ listPro, setListPro] = useState([]);
    
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
            // Cleanup on unmount
            return () => {
                socket.off('connect');
                socket.off('message');
            };
        }
    }, [socket]);

    return (
        <div className="w-full">
            <div className="flex justify-between my-10">
                <h1>Quản lý kênh</h1>
                <Button variant="primary">Thêm kênh</Button>
            </div>
            <table className="w-full border-collapse table-auto">
                <thead>
                    <tr className="">
                        <th>Tên kênh</th>
                        <th>Số luồng</th>
                        <th>Loại luồng</th>
                        <th>Trạng thái</th>
                        <th>Cổng</th>
                        <th>Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        listPro.map(item => (
                            <>
                            <tr key={item.name}>
                                <td>{item.name}</td>
                                <td>{item.streams.length}</td>
                                
                            </tr>
                            {
                                item.streams.map(pro => (
                                    <tr key={pro.name} className="bg-slate-200">
                                        <td></td>
                                        <td></td>
                                        <td>{pro.isMainInput ? 
                                            <Button size="sm" variant="outline-primary">Main</Button> : 
                                            <Button size="sm" variant="outline-success">Backup</Button>}
                                        </td>
                                        <td>{pro.isActive ?  
                                            <Button size="sm" variant="outline-primary">Play</Button> : 
                                            <Button size="sm" variant="outline-danger">Stop</Button>}</td>
                                        <td>{pro.port}</td>
                                        <td>1961</td>
                                    </tr>
                                ))
                            }
                            </>
                        ))
                    }
                    
                </tbody>
            </table>
        </div>
    )
}
