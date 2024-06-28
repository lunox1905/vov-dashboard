import { useContext, useState, useEffect } from "react";
import React from "react"

import { SocketContext } from "../context/SocketContext";
import { SettingContext } from "../context/SettingContext";

const listTime = [1,2,3,4,5,6,7,8]
export const Setting = () => {
    const { socket } = useContext(SocketContext);
    const { detailSetting, updateSetting } = useContext(SettingContext);
    const [detail, setDetail] = useState(null)
    const [streamSwitchTime, setStreamSwitchTime] = useState(null)
    useEffect(() => {
        detailSetting()
        .then(res => {
            setDetail(res.data)
            setStreamSwitchTime(res.data?.streamSwitchTime)
        })
    }, []);

    const handleUpdateTime = (value) => {
        setStreamSwitchTime(value)
        updateSetting({ streamSwitchTime: value })
        socket.emit('update-stream-switch-time', { time: value })
    }

    
    return (
        <div>
            <div className="flex">
            <label htmlFor="streamSwitchTime" className="mr-2">Thời gian chuyển luồng</label>
                <select 
                    className="border border-gray-300 rounded-md py-1 px-2 focus:outline-none focus:ring focus:border-blue-300"
                    value={streamSwitchTime ?? 1}
                    onChange={(e) => {
                        handleUpdateTime(e.target.value)
                    }}
                >
                    {
                        listTime.map(item => (
                            <option key={item} value={item}>{item} s</option>
                        ))
                    }
                </select>
            </div>
        </div>
    )
}
