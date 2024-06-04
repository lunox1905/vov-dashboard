import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import Layout from './views/Layout';
import { Channel } from './pages/Channel';
import { SocketProvider } from './context/SocketContext';
import { Dashboard } from './pages/Dashboard';
import { Home } from './pages/Home';
function App() {


  const router = createBrowserRouter(
    createRoutesFromElements(

      <Route path='/' element={<Layout />}>
        <Route path="" element={<Home />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="channel" element={<Channel />} />
        </Route>
      </Route>
    )
  )

  return (
    <SocketProvider>

      <div>
        <ToastContainer />
        <RouterProvider router={router} />

      </div>
    </SocketProvider>
  );
}

export default App