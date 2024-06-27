import React, { createContext, useContext } from 'react';
import axios from 'axios';

export const ChannelContext = createContext();
const URL = import.meta.env.VITE_URL;

export const useChannel = () => useContext(ChannelContext);
// eslint-disable-next-line react/prop-types
export const ChannelProvider = ({ children }) => {
    
    const listChannel = async () => {
        try {
            const res = await axios.get(`${URL}/channel/list`)
            console.log(res)
            return res.data;
        } catch (e){
            console.log('ERROR::' + e)
        }
    }

    const createChannel = async (data) => {
        try {
            const res = await axios.post(`${URL}/channel/create`, data)
            return res.data;
        } catch (e){
            console.log('ERROR::' + e)
        }
    }

    const updateChannel = async (data) => {
        try {
            const url = `${URL}/channel/update`
            const res = await axios.post(url, data)
        } catch (error) {
            console.log('ERROR::' + error)
            return error.message
        }
    }
    
  return (
    <ChannelContext.Provider value={{ createChannel, listChannel, updateChannel }}>
      {children}
    </ChannelContext.Provider>
  );
};