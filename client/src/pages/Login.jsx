import React from 'react'
import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../components/UserContext';

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
      console.log(data);
      loginUser(data.user);
      navigate('/');
    } catch (err) {
      console.error('Error trying to login', err);
    }
    
  }


  
  
  return (
    <>
      <div><h1>Login</h1></div>
      <form onSubmit={handleSubmit}>
        <label >Username: </label>
        <input type="text"  name='username' value={inputs.username || '' } onChange={handleChange} />
        <label >Password: </label>
        <input type="password"  name='password' value={inputs.password || ''} onChange={handleChange} />
        <button>Log In</button>
      </form>
    </>
  )
}

export default Login