import React from 'react'
import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../components/UserContext';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '@radix-ui/react-label';
import { FormLabel } from '../components/ui/form';

const Login = () => {
  const {loginUser} = useUser();
  const [inputs, setInputs] = useState('');
  const navigate = useNavigate();

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs( values => ({...values, [name]: value}) );
  }

  const handleSubmit = async (event) =>{
    event.preventDefault();
    try {
      const response = await fetch ('http://localhost:3000/login', {
        method : 'POST',
        headers : {
          'Content-Type' : 'application/json'
        },
        body : JSON.stringify(inputs),
        credentials : 'include'
      })
      const data = await response.json();
      console.log('data is ', data);
      loginUser(data.user);
      // navigate('/');
      window.location.href="/";
    } catch (err) {
      console.error('Error trying to login', err);
    }
    
  }


  
  
  return (
    <>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <label className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70' >Username: </label>
        <Input type="text"  name='username' value={inputs.username || '' } onChange={handleChange} />
        <label className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'  >Password: </label>
        <Input type="password"  name='password' value={inputs.password || ''} onChange={handleChange} />
        <Button variant='default' >Log In</Button  >
      </form>
    </>
  )
}

export default Login