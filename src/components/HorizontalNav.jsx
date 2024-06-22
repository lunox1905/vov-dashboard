import { useNavigate } from 'react-router-dom';
import React from 'react';

export const HorizontalNav = () => {
    const navigate = useNavigate();
    const navigateTo = (subpath) => {
        navigate(subpath)
    }
    return (
        <>
          
        </>
    )
}
