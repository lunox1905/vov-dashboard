import React, { createContext, useContext } from 'react';
import axios from 'axios';

export const SettingContext = createContext();
const URL = import.meta.env.VITE_URL;

export const useSetting = () => useContext(SettingContext);
// eslint-disable-next-line react/prop-types
export const SettingProvider = ({ children }) => {
    
    const detailSetting = async () => {
        try {
            const res = await axios.get(`${URL}/setting/detail`)
            return res.data;
        } catch (e){
            console.log('ERROR::' + e)
        }
    }

    const updateSetting = async (data) => {
        try {
            console.log(data)
            const res = await axios.put(`${URL}/setting/update`, data)
            return res.data;
        } catch (e){
            console.log('ERROR::' + e)
        }
    }

  return (
    <SettingContext.Provider value={{ detailSetting, updateSetting }}>
      {children}
    </SettingContext.Provider>
  );
};