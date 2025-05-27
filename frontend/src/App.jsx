import './App.css'
import Login from './pages/Login'
import Home from './pages/Home'
import Signup from './pages/Signup'
import 'react-toastify/dist/ReactToastify.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import React, {useState} from 'react';
import RefreshHandler from './RefreshHandler';



function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(false);

 const PrivateRoute = ({element}) => {
  return isAuthenticated ? element : <Navigate to='/login' /> 
 }

  return (
    <>
      <div className="App"></div>
      <RefreshHandler  setIsAuthenticated={setIsAuthenticated}/>
      <Routes>
        <Route path='/' element={<Navigate to='/login'/> }/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/home' element={<PrivateRoute element={<Home/>}/>}/>
      </Routes>
    </>
  )
}

export default App
