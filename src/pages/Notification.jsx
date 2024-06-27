import { React, useEffect, useState, useContext } from "react";
import axios from 'axios';
import { toast } from 'react-toastify';
import { SocketContext } from "../context/SocketContext";
import { PaginationNoti } from "../components/PaginationNoti";
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
    
    return (
        <>
            
            <PaginationNoti items={ logs} itemsPerPage={8} />
        </>
    )
}