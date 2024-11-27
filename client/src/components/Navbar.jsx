import React from 'react'
import { Link } from 'react-router-dom'
import { useUser } from './UserContext'
import { useNavigate } from 'react-router-dom'



const Navbar = () => {
  
    const {user, logoutUser} = useUser();
    const navigate = useNavigate();
    const handleLogout = () => {
        logoutUser();
        navigate('/');
    }

  
    return (
    <nav style={{gap : "20%", justifyContent : 'center'}}>
            <Link to='/'  >
                Home
            </Link>
            { user ? 
            <>
            <Link to='/account'>
                Account
            </Link>
            <Link to='/' onClick={handleLogout}>
                Logout
            </Link>
            {user.role === 'ADMIN' && 
            <Link to='/create-blog'>
                Create Blogpost
            </Link> }
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
    </nav>
)
}

export default Navbar