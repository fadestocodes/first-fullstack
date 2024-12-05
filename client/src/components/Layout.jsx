import React from 'react'
import Navbar from './Navbar'
import { useLocation } from 'react-router-dom'
import footerimage from '../assets/footerimage.jpg'
import {Card, CardTitle, CardHeader, CardContent} from './ui/card';
import Footer from './Footer'


const Layout = ({children}) => {

  return (
<div className='  flex flex-col justify-center items-center w-full mb-0' >
    <div className='flex-1 relative w-full'>
        <Navbar className='w-full' />
    </div>
    <div className=' pt-28  w-full h-full flex flex-col justify-start items-center '>
        <div  className='px-12  '>
            {children }
        </div>
        <Footer></Footer>
    </div>
</div>

)
}

export default Layout