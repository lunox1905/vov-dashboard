import {  useNavigate } from 'react-router-dom';
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';

import { SocketContext } from '../context/SocketContext';
export const VerticalNav = () => {
    const { socket } = useContext(SocketContext);
    const navigate = useNavigate();
    const navigateTo = (subpath) => {
        navigate(subpath)
    }
    const [ hasNewLog, setHasNewLog ] = useState(false);

    useEffect(() => {
        checkNewLog()

        socket.on('new-noti', () => {
            setHasNewLog(true)
        })
    }, [])
    const checkNewLog = () => {
        const check = async () => {
            const response = await axios.get(`${import.meta.env.VITE_URL}/logs/check-new-log`,)
            return response.data;
        }
        check().then(newLogs => {
            setHasNewLog(newLogs.hasNew)
        })
    }

    const handleClickNotifi = () => {
        const readAllProcess = async () => {
            const response = await axios.post(`${import.meta.env.VITE_URL}/logs/read-all`);
            return response.data;
        }
        readAllProcess()
        
        setHasNewLog(false)
        navigateTo("/notification")
    }
    return (
        <>
            <div className="min-h-screen flex items-start justify-center bg-gray-100 ">
                <div className="flex min-h-screen w-full max-w-xs p-2 bg-white">
                    <ul className="flex flex-col w-full">
                        <li className="my-px">

                            <div onClick={() => navigateTo("/dashboard")} className=" cursor-pointer flex flex-row items-center h-12 px-4 rounded-lg text-gray-600 bg-gray-100">
                                <span className="flex items-center justify-center text-lg text-gray-400">
                                    <svg fill="none"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        className="h-6 w-6">
                                        <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
                                    </svg>
                                </span>
                                <span className="ml-3" onClick={() => navigateTo("/dashboard")}>Dashboard</span>
                            </div>
                          
                        </li>
                        <li className="my-px">
                            <span className="flex font-medium text-sm text-gray-400 px-4 my-4 uppercase">Manager</span>
                        </li>
                        <li className="my-px">
                            <div onClick={() => navigateTo("/channel")} className=" cursor-pointer flex flex-row items-center h-12 px-4 rounded-lg text-gray-600 hover:bg-gray-100">
                                <span className="flex items-center justify-center text-lg text-gray-400">
                                    <svg fill="none"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        className="h-6 w-6">
                                        <path d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"></path>
                                    </svg>
                                </span>
                                <span className="ml-3" >Channel</span>
                            </div>
                            
                        </li>
                        <li className="my-px">
                            <div onClick={handleClickNotifi} className="cursor-pointer flex flex-row items-center h-12 px-4 rounded-lg text-gray-600 hover:bg-gray-100">
                                <span className="flex items-center justify-center text-lg text-gray-400">
                                    <svg fill="none"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        className="h-6 w-6">
                                        <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path>
                                    </svg>
                                </span>
                                <span className="ml-3" >Notification</span>
                                {
                                    hasNewLog && <div className='flex items-center justify-center w-[16px] h-[16px] ml-2 bg-rose-500 rounded-full'>
                                    <span style={{color: 'white', fontWeight: 600}}>!</span>
                                </div>
                                }
                            </div>
                        </li>
                    
                        <li className="my-px">
                            <div onClick={() => navigateTo("/setting")} className="cursor-pointer flex flex-row items-center h-12 px-4 rounded-lg text-gray-600 hover:bg-gray-100">
                                <span className="flex items-center justify-center text-lg text-gray-400">
                                    <svg fill="none"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        className="h-6 w-6">
                                        <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path>
                                    </svg>
                                </span>
                                <span className="ml-3" >Setting</span>
                            </div>
                           
                        </li>
                    </ul>
                </div>
            </div>
        </>
    )
}
