import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';

const Login = () => {
	const {login}=useContext(AuthContext)
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const navigate = useNavigate()
	const [error, setError] = useState("")
	useEffect(() => {
		if (error) {
			toast.error(error)
		}
	}, [error])
	const handleSubmit = () => {
		signIn()
	};

	const signIn = async ( ) => {
		try {
			const response = await axios.post("http://127.0.0.1:3000/auth/login", {
				email: email,
				password: password

			})
			if (!response.data || response.data.status === "error") {
				console.log("cli1")
				return setError("Cannot login")
			}
			if (!response.data.token) {
				console.log("cl2")
				return setError("Do not receive token")
			}
			toast.success("Login successfully !")
			localStorage.setItem('authToken', response.data.token)
			login()
		} catch (error) {
			if (error.response?.data?.message) {
				return setError(error.response?.data?.message)
			}
			setError(error.message)
		}
	}
	
	const navigateTo = (path) => {
		navigate(path)
	}
	return (
		<div className="min-h-screen flex items-center justify-center ">
			<div className="bg-white p-8 rounded-lg shadow-lg w-96">
				<h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
				<form onSubmit={handleSubmit}>
					<div className="mb-4">
						<label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
							Username
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
					<div className="flex items-center justify-between mb-6">
						<p  className="text-sm text-blue-500 hover:text-blue-800">Forgot password?</p>
						<p className="cursor-pointer text-sm text-blue-500 hover:text-blue-800" onClick={()=>{navigateTo("/")}}> Return Home Page</p>

					</div>
					<div>
						<button
							type="button" onClick={()=>handleSubmit()}
							className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
						>
							LOGIN
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default Login;