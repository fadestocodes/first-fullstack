import React from 'react'

import { useUser } from '../components/UserContext';

const Homepage = () => {
  const {user} = useUser();
  console.log('user is ', user);




  return (
    
    <>
      <h1>Homepage</h1>
      { user && <h2>Welcome {user.username}!</h2> }
    </>
  )
}

export default Homepage;