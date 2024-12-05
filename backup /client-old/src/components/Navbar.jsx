import React from 'react'
import { Link } from 'react-router-dom'
import { useUser } from './UserContext'
import { useNavigate } from 'react-router-dom'
import { MapPin } from 'lucide-react';



const Navbar = () => {
  
    const {user, logoutUser} = useUser();
    const navigate = useNavigate();
    const handleLogout = () => {
        logoutUser();
        navigate('/');
    }
    

  
    return (
        <nav className=' z-50  grid grid-cols-3 w-[100%]  items-center fixed top-0 gap-6 bg-white h-14 font-semibold ' >
                <div className='flex items-center justify-start ml-8'>
                    <MapPin className='scale-60 mr-2'></MapPin> <div className='text-xs justify-center items-center'>Vancouver, BC</div>
                </div>
                <div className='nav-item flex justify-center items-center gap-10 '>
                    <Link to='/'  >
                        Home
                    </Link>
                    <Link to='/blog'  >
                        Blog
                    </Link>
                    { user ?
                    <>
                    {user.role === 'ADMIN' &&
                    <>
                    {/* <Link to='/admin'>
                        Admin
                    </Link> */}
                    </>}
                    <Link to='/account'>
                        Account
                    </Link>
                    <Link to='/' onClick={handleLogout}>
                        Logout
                    </Link>
                    </>
                    :
                    <>
                    <Link to='/sign-up'>
                        Signup
                    </Link>
                    <Link to='/login'>
                        Login
                    </Link>
                    </>
                }
                </div>
                <span className=''></span>
        </nav>
)
}

export default Navbar