import React from 'react'
import { useNavigate, Outlet, useLocation } from 'react-router-dom'
import {Button} from '../components/ui/Button';


  

const  Admin = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const isAdminPage =  location.pathname === '/admin';
    
    return (
        <>
        { isAdminPage && (
        <>
            <h1>Admin</h1>
            <Button variant='default' onClick={()=> navigate('/admin/unpublished-posts')} >Unpublished Posts</Button>
            <Button variant='default' onClick={()=>{navigate('/admin/create-blogpost')}} >Create New Post</Button>
        </>
        )}
        <Outlet/>
        </>
  )
}

export default  Admin