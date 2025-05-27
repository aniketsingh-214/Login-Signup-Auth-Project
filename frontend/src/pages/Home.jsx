import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

function Home() {
  const [loggedInUser, setLoggedInUser] = useState('');
  const [userEmail, setUserEmail] = useState(' ');

  const navigate = useNavigate();

  useEffect(() => {
    const name = localStorage.getItem('loggedInUser');
    const email = localStorage.getItem('loggedInEmail'); 
    setLoggedInUser(name);
    if(email) setUserEmail(email);
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('loggedInUser');
    localStorage.removeItem('loggedInEmail');
    setTimeout(() =>{
      navigate('/login');
    }, 1000)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 p-6">
      <div className="bg-white rounded-xl shadow-lg max-w-sm w-full p-8 flex flex-col items-center">
        <img 
          src="https://cdn-icons-png.flaticon.com/512/149/149071.png" 
          alt="User Logo" 
          className="w-24 h-24 rounded-full mb-6"
        />
        <h2 className="text-2xl font-semibold mb-2 text-gray-800">{loggedInUser || 'Guest User'}</h2>
        <p className="text-gray-500 mb-6">{userEmail}</p>
        <button
          onClick={handleLogout}
          className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-red-700 transition"
        >
          Logout
        </button>
      </div>
    </div>
  )
}

export default Home
