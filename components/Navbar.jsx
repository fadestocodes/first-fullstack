import React from 'react'
import Link from 'next/link'
// import { useUser } from './UserContext'
import { MapPin } from 'lucide-react';



const Navbar = () => {
  

  
    return (
        <nav className=' z-50  grid grid-cols-3 w-[100%]  items-center fixed top-0 gap-6 bg-white h-14 font-semibold ' >
                <div className='flex items-center justify-start ml-8'>
                    <MapPin className='scale-60 mr-2'></MapPin> <div className='text-xs justify-center items-center'>Vancouver, BC</div>
                </div>
                <div className='nav-item flex justify-center items-center gap-10 '>
                    <Link href='/'  >
                        Home
                    </Link>
                    <Link href='/blogs'  >
                        Blog
                    </Link>
                    <>
                    <Link href='/account'>
                        Account
                    </Link>
                    <Link href='/'>
                        Logout
                    </Link>
                    </>
                    
                    <>
                    <Link href='/sign-up'>
                        Signup
                    </Link>
                    <Link href='/login'>
                        Login
                    </Link>
                    </>
                </div>
                <span className=''></span>
        </nav>
)
}

export default Navbar