import { React, useEffect, useState, useContext } from "react";
import axios from 'axios';
import { toast } from 'react-toastify';
import { SocketContext } from "../context/SocketContext";

export const Notification = () => {
    const [logs, setLogs] = useState([])
    const [error, setError] = useState("")
    const { socket } = useContext(SocketContext);

    useEffect(() => {
        socket.on('new-noti', () => {
            getLog()

        })

    }, [socket])
    useEffect(() => {
        getLog()

    }, [])
    useEffect(() => {
        if (error) {
            toast.error((error))
        }
    }, [error])
    const getLog = () => {
        const fetchLogs = async () => {
            try {
                const response = await axios(`${import.meta.env.VITE_URL}/logs`)
                return response.data.data
            } catch (error) {
                if (error.response?.data?.message) {
                    return setError(error.response?.data?.message)
                }
                setError(error.message)
            }
        }
        fetchLogs().then(newLogs => {
            setLogs(newLogs)
        })
    }
    
    const convertTime = (isoDateString) => {
        const date = new Date(isoDateString);
        const humanReadableTime = date.toUTCString(); // Example: "Thu, 22 Jun 2024 01:49:35 GMT"
        return humanReadableTime
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
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>

                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {logs && logs.map((log, idx) => {
                            return (
                                <tr key={idx}>
                                    <td className="px-6 py-4 whitespace-nowrap">{convertTime(log.created_at)}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{log.title}</td>
                                    <td className="px-6 py-4 whitespace-nowrap"> {log.content}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">  {log.level}</td>

                                </tr>
                                // <div key={idx} className="flex justify-around">
                                //     <span>
                                //         {log.title}

                                //     </span>
                                //     <span>
                                //         {log.content}
                                //     </span>
                                //     <span>
                                //         {log.level}
                                //     </span>
                                // </div>
                            )
                        })}

                    </tbody>
                </table>
                <ul>


                </ul>



            </div>
        </>
    )
}