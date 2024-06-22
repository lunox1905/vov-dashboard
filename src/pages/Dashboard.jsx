import { React, useContext, useEffect, useState } from "react"
import Card from 'react-bootstrap/Card';
import { SocketContext } from "../context/SocketContext"
export const Dashboard = () => {
    const { socket } = useContext(SocketContext);
    const [info, setInfo] = useState({})
    useEffect(() => {
        if (socket) {
            socket.emit('info-dashboard', (data) => {
                setInfo(data)
            })
            // Cleanup on unmount
            return () => {
                socket.off('connect');
                socket.off('message');
            };
        }
    }, [socket]);

    return (
        <>
        <div className=" w-full">
            <h1 className="text-xl mb-3">Dashboard</h1>
            <div className="flex justify-between">
              
                <Card
                    bg={'primary'}
                    key={'d'}
                    text={'white'}
                    style={{ width: '18rem' }}
                    className="mb-2"
                >
                    <Card.Body>
                        <Card.Title>Channel</Card.Title>
                        <Card.Text>
                            Có {info.amountChannel} kênh trong hệ thống
                        </Card.Text>
                    </Card.Body>
                </Card>
                <Card
                    bg={'secondary'}
                    key={'d'}
                    text={'white'}
                    style={{ width: '18rem' }}
                    className="mb-2"
                >
                    <Card.Body>
                        <Card.Title> Stream </Card.Title>
                        <Card.Text>
                        Có {info.amountStream} luồng trong hệ thống
                        </Card.Text>
                    </Card.Body>
                </Card>
                <Card
                    bg={'warning'}
                    key={'d'}
                    text={'white'}
                    style={{ width: '18rem' }}
                    className="mb-2"
                >
                    <Card.Body>
                        <Card.Title>Listen WebRTC </Card.Title>
                        <Card.Text>
                        Có {info.amountPlayerRTC} đang nghe theo webrtc
                        </Card.Text>
                    </Card.Body>
                </Card>
                <Card
                    bg={'danger'}
                    key={'d'}
                    text={'white'}
                    style={{ width: '18rem' }}
                    className="mb-2"
                >
                    <Card.Body>
                        <Card.Title>Listen HLS</Card.Title>
                        <Card.Text>
                        Có {info.amountPlayerHls} người đang nghe theo hls
                        </Card.Text>
                    </Card.Body>
                </Card>
            </div>
            </div>
        </>
    )
}