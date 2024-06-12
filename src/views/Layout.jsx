import React from 'react';
import { Outlet } from 'react-router-dom';
import { BaseNav } from '../components/BaseNav';
import { Authednav } from '../components/AuthedNav';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
function Layout() {
    const { isLoggedIn } = useContext(AuthContext);
    return (
        <div >
            {/* {isLoggedIn ? <Authednav /> : <BaseNav />}        */}
            <Outlet />
        </div>
    );
}

export default Layout;