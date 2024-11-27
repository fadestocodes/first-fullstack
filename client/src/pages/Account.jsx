import React from 'react'
import { useEffect } from 'react';
import { useUser } from '../components/UserContext'


const Account = () => {
  const {user} = useUser();
  console.log('User is: ', user);
  if (!user) {
    return <p>Loading user information...</p>; // Show a loading message or spinner
  }

  const handleRoleButton = async () => {
    const response = await fetch ('http://localhost:3000/update-role', {
        method : 'POST',
        headers : {
            'Content-Type' : 'application/json',
        },
        body : JSON.stringify(user),
        credentials : 'include'
    })
    if (response.ok){
        const data =  await response.json();
    }
  }
  
 
    return (

    <>
        <h1>Account</h1>
        <h3>Username: </h3><p>{user.username}</p>
        <h3>Email: </h3><p>{user.email}</p>
        <h3>Role: </h3><p>{user.role}</p><button onClick={handleRoleButton} >Change Role</button>
    </>
  )
}

export default Account