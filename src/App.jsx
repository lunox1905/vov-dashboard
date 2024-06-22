import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
  Navigate,
} from 'react-router-dom';
import React, { useContext } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Layout from './views/Layout';
import { Channel } from './pages/Channel';
import { SocketProvider } from './context/SocketContext';
import { Dashboard } from './pages/Dashboard';
import { Home } from './pages/Home';
import Login from './pages/Login';
import { AuthContext } from './context/AuthContext';
import { Landing } from './pages/Landing';
import { Signup } from "./pages/Signup"
import 'react-toastify/dist/ReactToastify.css';
import { Notification } from './pages/Notification';
function App() {
  const { isLoggedIn } = useContext(AuthContext);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />}>
        <Route
          path="/"
          element={
            isLoggedIn ? <Home /> : <Login />
          }
        >
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="channel" element={<Channel />} />
          <Route path="notification" element={<Notification/>} />
        </Route>
        {/* <Route path="login" element={<Login />} /> */}
        <Route path="signup" element={<Signup />} />
        <Route
          path="*"
          element={isLoggedIn ? <Navigate to="/" replace /> : <Landing/>}
        />
      </Route>
    )
  );

  return (
    <SocketProvider>
      <div>
        <ToastContainer />
        <RouterProvider router={router} />
      </div>
    </SocketProvider>
  );
}

export default App;