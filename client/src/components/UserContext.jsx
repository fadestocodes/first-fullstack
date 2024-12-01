import React from 'react'
import { createContext, useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom';

const UserContext = createContext();



export const UserProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    const [loadingState, setLoadingState] = useState(true);
    useEffect(()=>{
        const checkAuthentication = async () => {
            try {
                const response = await fetch ('http://localhost:3000/authenticate', {
                    method : 'GET',
                    credentials : 'include'
                });
                if (response.ok) {
                    const data = await response.json();
                    console.log('Data from checkAuthentication: ', data);
                    setUser(data.user);
                } else if (response.status === 401){
                    console.warn('No user logged in yet');
                    setUser(null);
                } 
                
                else {
                    setUser(null);
                }
                
            } catch (err) {
                console.error('Error checking authentication', err);
                setUser(null);
            } finally {
                setLoadingState(false);
            }
        };
      
        checkAuthentication();
    }, [])
    
    // useEffect(()=>{
    //     if (user){
    //         console.log('User logged in: ', user)
    //     }
    // }, [user, navigate])
    
    
    
    const loginUser = (userData) => {
        
        setUser(userData);
    };

    const logoutUser = async () => {
        const response = await fetch('http://localhost:3000/logout', {
            method : "POST",
            credentials : 'include'
        });
        if (response.ok){
            setUser(null);
        } else {
            console.error ('Logout failed');
        }
    };

  return (
    <>
        <UserContext.Provider value = {{user, loginUser, logoutUser, loadingState}}>
            {loadingState ? <p>Loading...</p> : children}
        </UserContext.Provider>
    </>
  )
}


export const useUser = () => {
    return useContext(UserContext)
}
