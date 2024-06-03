import { useState,useContext ,useEffect} from "react"
import { SocketContext } from "../context/SocketContext"
export const Dashboard = () => {
    const { socket,producers } = useContext(SocketContext)
    return (
        <>
            <div>
                <span> Dashboard</span>
                {producers && Object.entries(producers).map(([channel, map_channel]) => (
                    map_channel.map((stream, index) => {
                        
                        return (
                            <div key={index} className="flex justify-between gap-3">
                                <p><b> Channel: </b>{channel}</p>
                                <p><b>Slug: </b>{ stream.slug}</p>
                                <p> <b>Id: </b> {stream.id}</p>
                                
                            </div>
                        )
                    } )      
                ))
                }
           </div>
          
        </>
    )
}