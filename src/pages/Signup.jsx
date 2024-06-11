import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
export const Signup = () => {
    const { login } = useContext(AuthContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate()
    const [error,setError]=useState("")
    const handleSubmit =  (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            return setError("Confirm password does not mathc")
        }
        if (!email) {
            return setError("Email is empty")
        }
        if (!password) {
            return setError("Password is empty")
        }
       register(email,password)

    };

    const register = async (email, password) => {
        try {
            console.log("email,pass",email,password)
            const response = await axios.post("http://localhost:3000/auth/register", {
                email: email,
                password: password

            })
            if (!response.data.token) {
                return setError("Cannot get token")
            }
            localStorage.setItem('authToken', response.data.token)
            window.dispatchEvent(new Event("storage"));
toast.success("Registered successfully !")
        } catch (error) {
            setError(error)
        }
    }
    useEffect(() => {
        if (error) {
            toast.error(error)
        }
    },[error])
    const navigateTo = (path) => {
        navigate(path)
    }
    return (
        <div className="min-h-screen flex items-center justify-center ">
            <div className="bg-white p-8 rounded-lg shadow-lg w-96">
                <h2 className="text-2xl font-bold mb-6 text-center">Sign up</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                            Email
                        </label>
                        <input
                            type="text"
                            id="username"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-3 py-2 border rounded shadow appearance-none focus:outline-none focus:ring focus:border-blue-500"
                            placeholder="Username"
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-3 py-2 border rounded shadow appearance-none focus:outline-none focus:ring focus:border-blue-500"
                            placeholder="Password"
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" >
                            Confirm Password
                        </label>
                        <input
                            type="password"
                            id="confirmpassword"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="w-full px-3 py-2 border rounded shadow appearance-none focus:outline-none focus:ring focus:border-blue-500"
                            placeholder="Confirm Password"
                            required
                        />
                    </div>
                    <div className="flex items-center justify-between mb-6">
                        <p  className=" cursor-pointer text-sm text-blue-500 hover:text-blue-800">Forgot password?</p>
                        <p  className="cursor-pointer text-sm text-blue-500 hover:text-blue-800" onClick={()=>{navigate("/")}}>Return home page</p>
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                            Sign up
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

