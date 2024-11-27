import { useState } from 'react'
import './App.css'
import Homepage from './pages/Homepage'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Navbar from './components/Navbar'
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import { UserProvider } from './components/UserContext'
import Admin from './pages/Admin'
import Blogs from './pages/Blogs'
import Account from './pages/Account'

function App() {

  return (

    <div>
        <BrowserRouter>
        <UserProvider>
          <Navbar />
          <Routes>
            <Route path='/' element={<Homepage/>} ></Route>
            <Route path='/sign-up' element={<Signup/>} ></Route>
            <Route path='/login' element={<Login/>} ></Route>
            <Route path='/admin' element={<Admin/>} ></Route>
            <Route path='/blogs' element={<Blogs/>} ></Route>
            <Route path='/account' element={<Account/>} ></Route>
          </Routes>
        </UserProvider>
        </BrowserRouter>
    </div>


  )
}
export default App
