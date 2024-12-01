import React from 'react'
import { useNavigate, Outlet, useLocation } from 'react-router-dom'

const  Admin = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const isAdminPage =  location.pathname === '/admin';
    
    return (
        <>
        { isAdminPage && (
        <>
            <h1>Admin</h1>
            <button onClick={()=> navigate('/admin/unpublished-posts')} >Unpublished Posts</button>
            <button onClick={()=>{navigate('/admin/create-blogpost')}} >Create New Post</button>
        </>
        )}
        <Outlet/>
        </>
  )
}

export default  Admin