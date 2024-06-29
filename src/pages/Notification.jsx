/* eslint-disable react-hooks/exhaustive-deps */
import { React, useEffect, useState, useContext } from "react";
import axios from 'axios';
import { toast } from 'react-toastify';
import { SocketContext } from "../context/SocketContext";
import Pagination from "../components/Pagination";

export const Notification = () => {
    const [error, setError] = useState("")
    const { socket } = useContext(SocketContext);
    const [ currentPage, setCurrentPage ] = useState(1);
    const [ itemsPerPage, setItemsPerPage ] = useState(8);
    const [ noti, setNoti ] = useState({
        total: 0,
        data: []
    })
    useEffect(() => {
        socket.on('new-noti', () => {
            getLog()

        })

    }, [socket])
    useEffect(() => {
        getLog()
        
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentPage])
    useEffect(() => {
        if (error) {
            toast.error((error))
        }
    }, [error])
    const getLog = () => {
        const fetchLogs = async () => {
            try {
                const response = await axios(`${import.meta.env.VITE_URL}/logs?currentPage=${currentPage}&itemsPerPage=${itemsPerPage}`,)
                return response.data;
            } catch (error) {
                if (error.response?.data?.message) {
                    return setError(error.response?.data?.message)
                }
                setError(error.message)
            }
        }
        fetchLogs().then(newLogs => {
            setNoti({
                data: newLogs.data,
                total: newLogs.total
            })
        })
    }
    
    return (
        <>
            <div className="w-screen px-2">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>

                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Content</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Level</th>

                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {noti.data.map((log, idx) => {
                            return (
                                <tr key={idx}>
                                    <td className="px-6 py-4 whitespace-nowrap">{new Date(log.created_at).toUTCString()}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{log.title}</td>
                                    <td className="px-6 py-4 whitespace-nowrap"> {log.content}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">  {log.level}</td>

                                </tr>

                            )
                        })}

                    </tbody>
                </table>
                <Pagination currentPage={currentPage} 
                itemsPerPage={itemsPerPage} 
                totalItem={noti.total}
                setCurrentPage={setCurrentPage} />
            </div>
            
        </>
    )
}