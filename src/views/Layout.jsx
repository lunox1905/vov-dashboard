import React from 'react';
import { Outlet } from 'react-router-dom';

import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
function Layout() {
    const { isLoggedIn } = useContext(AuthContext);
    return (
        <div >
            <Outlet />
        </div>
    );
}

export default Layout;