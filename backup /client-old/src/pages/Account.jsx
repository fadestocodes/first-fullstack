import React from 'react'
import {useState, useEffect } from 'react';
import { useUser } from '../components/UserContext'
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';



  
const Account = () => {
  const {user} = useUser();
  console.log('User is: ', user);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [errs, setErrs] = useState(null);
  const navigate = useNavigate();

  const defaultPage = (e) => {
    e.preventDefault();
    setIsModalOpen(false);
    setIsConfirmationOpen(false);
}

const showForm = (e) => {
    e.preventDefault();
    setIsModalOpen(true);
    setIsConfirmationOpen(false);
}

const showConfirmPage = (e) => {
    e.preventDefault();
    setIsModalOpen(false);
    setIsConfirmationOpen(true);
}


const [inputs, setInputs] = useState({
    password : '',
    roleSelection : user.role
})

const handleChange = (event) =>{
    const {name, value} = event.target;
    setInputs( (prevData) => ({
        ...prevData,
        [name] : value
    }) )
    
}  


const handleSubmit = async (e) => {
    
    e.preventDefault();
    const response = await fetch ('http://localhost:3000/update-role', {
        method : 'POST',
        headers : {
            'Content-Type' : 'application/json',
        },
        body : JSON.stringify({...user, password :  inputs.password, newRole : inputs.roleSelection}),
        credentials : 'include'
    })
    if (response.ok){
        const data =  await response.json();
        console.log('data is : ', data);
        window.location.href = '/account';
        // navigate('/');
    } else {
        setErrs('Incorrect password, try again.');
    }
    
}
if (!user) {
  return <p>Loading user information...</p>; // Show a loading message or spinner
}
return (
    <>
        {!isModalOpen && !isConfirmationOpen && (
           <div style={{display : 'flex', flexDirection : 'column', justifyContent : 'center', alignItems : 'center',  width : '100%' }}>
              <div style={{ backgroundColor : 'white' }} >
                    <h1>Account</h1>
                    <div style={{display: 'flex', justifyContent: 'center', alignItems:'center', gap : '8%', width : '100%' }} >
                        <h3>Username: </h3><p>{user.username}</p>
                    </div>
                    <div style={{display: 'flex', justifyContent: 'center', alignItems:'center', gap : '8%' , width : '100%'}} >
                        <h3>Email: </h3><p>{user.email}</p>
                    </div>
                    <div style={{display: 'flex', justifyContent: 'center', alignItems:'center', gap : '8%', width : '100%' }} >
                        <h3>Role: </h3><p>{user.role}</p>
                    </div>
                    <Button variant='default' onClick={showForm} >Change Role</Button>
                </div>
            </div>
        )}

            {isModalOpen && (
                <div className='form-page'>
                    <h2>Change Role</h2>
                    <div style={{display: 'flex', justifyContent: 'center', alignItems:'center', gap : '8%', width : '100%' }} >
                        <h3>Current role: </h3><p>{user.role}</p>
                    </div>
                    <div style={{display: 'flex', justifyContent: 'center', alignItems:'center', gap : '8%', width : '100%' }} >
                    <h3>New role: </h3>
                    <form onSubmit={showConfirmPage}>
                    <select name="roleSelection"  value={inputs.roleSelection} onChange={handleChange}  >
                        { user.role === 'REGULAR' ? (
                        <>
                        <option value="REGULAR">REGULAR</option>
                        <option value="ADMIN">ADMIN</option>
                        </>)
                        : (
                        <>
                        <option value="ADMIN">ADMIN</option>
                        <option value="REGULAR">REGULAR</option>
                        </>)}
                    </select>
                    </form>
                    </div>
                    <Button variant='default' onClick={showConfirmPage}>Change Role</Button>
                </div>
            )}

            {isConfirmationOpen && ( 

                    <div className='confirm-page'>
                        <h3>Enter the password to change your role: </h3>
                        <form onSubmit={handleSubmit}>

                            <label >Password</label>
                            <input type="password" name='password' value = {inputs.password} onChange={handleChange} />
                            { errs && <div style={{color : "red"}} >Incorrect password</div> }
                            <Button variant='default'>Submit</Button>
                        </form>
                    </div>

                )
            }

    </>
    )
}

export default Account