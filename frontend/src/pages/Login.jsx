import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { handleError, handleSuccess } from '../utils'

function Login() {

    const[login, setLogin] = useState({
        email: '',
        password: ''

    })
    
    const navigate = useNavigate();

    const handleChange = (e)=> {
        const {name, value} = e.target;
        const loginInfo = {...login};
        loginInfo[name] = value;
        setLogin(loginInfo);

    }

    const handlelogin = async (e) => {
      e.preventDefault();
      const {email, password} = login;
      if(!email || !password){
        return handleError('All fileds are required!')
      }
      try {
        const url = 'http://localhost:8080/auth/login';
        const response = await fetch(url, {
          method: 'POST',
          headers:{
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(login)
        });
        const result = await response.json();
        const {success, message, jwtToken, name, email, error} = result;
        if(success){
          handleSuccess(message);
          localStorage.setItem('token', jwtToken);
          localStorage.setItem('loggedInUser', name);
          localStorage.setItem('loggedInEmail', email); 
          setTimeout( ()=>{
            navigate('/home')
          }, 1000)
        }
        else if(error){
          const details = error?.details[0].message;
          handleError(details);
        }
        else if(!success){
          handleError(message);
        }

      }catch(err){
        handleError(err);
      }
    }
    
        
    
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 p-10">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <form onSubmit={handlelogin} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              onChange={handleChange}
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              value={login.email}
              className="mt-1 block w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              onChange={handleChange}
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              value={login.password}
              className="mt-1 block w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition"
          >
            Login 
          </button>
        </form>
        <span className="block text-center text-sm text-gray-600 mt-4">
          Don't have an account?{' '}
          <Link to="/signup" className="text-blue-600 hover:underline">
            Signup
          </Link>
        </span>
        <ToastContainer/>
      </div>
    </div>
  )
}

export default Login
