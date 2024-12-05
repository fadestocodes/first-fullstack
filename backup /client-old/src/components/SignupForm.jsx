import React from 'react'
import {useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

const SignupForm = () => {
    const [inputs, setInputs] = useState('');
    const [errors, setErrors] = useState({
        validationErrors : {},
        serverErrors : []
    });
    const navigate = useNavigate();

    const validate = () => {
        const newErrors = {};
        if (!inputs.firstName){
            newErrors.firstName = "First name is required.";
        } 
        if (!inputs.lastName){
            newErrors.lastName = "Last name is required.";
        } 

        if (!inputs.username){
            newErrors.username = "Username is required.";
        }
        if (!inputs.email){
            newErrors.email = "Email is required.";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inputs.email)) {
            newErrors.email = "Enter valid email address.";
        }
        if (!inputs.password){
            newErrors.password = "Password is required.";
        } else if (inputs.password.length < 6) {
            newErrors.password = "Password must be at least 6 characters.";
        }

        setErrors( prevErrors => ({
            ...prevErrors,
            validationErrors : newErrors
        }) );
        return Object.keys(newErrors).length === 0;

    }


    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs( values => ({...values, [name] : value}) );
    }
    
    const handleSubmit =  async (event) => {
        event.preventDefault();
        if (validate()){
            console.log("Submitted successfully", inputs);
            try {
                const response = await fetch ('http://localhost:3000/sign-up', {
                    method : 'POST',
                    headers : {
                        'Content-Type' : 'application/json'
                    },
                    body : JSON.stringify(inputs)
                });
                const data = await response.json();
    
                if (response.ok){
                    navigate('/');
                    console.log("Success", data.message);
                } else {
                    console.error('Data is: ', data);
                    console.error('Data Error is: ', data.error);
                    setErrors( prevErrors => ({
                        ...prevErrors,
                        serverErrors : [ data.error]
                    }) );
                }
                
            } catch (err) {
                console.error(err);
            }
        } else {
            console.log('validation error');
        }
    }

  
    return (
    <div >
        <form onSubmit = {handleSubmit} style={{display : 'flex', flexDirection : 'column', alignItems : 'center', justifyContent : 'center'}}>
            <div className="input">
                <label >First Name: </label>
                <input type="text" name="firstName" id="firstName" value = {inputs.firstName || ''} onChange = {handleChange}  />
                {errors.validationErrors.firstName && <span >{errors.validationErrors.firstName}</span>}
            </div>
            <div className="input">
                <label>Last Name: </label>
                <input type="text" name="lastName" id="lastName" value = {inputs.lastName || ''} onChange = {handleChange}  />
                {errors.validationErrors.lastName && <span>{errors.validationErrors.lastName}</span>}
            </div>
            <div className="input">
                <label>Email: </label>
                <input type="email" name="email" id="email" value = {inputs.email || ''} onChange = {handleChange}  />
                {errors.validationErrors.email && <span>{errors.validationErrors.email}</span>}
            </div>
            <div className="input">
                <label>Username: </label>
                <input type="text" name="username" id="username" value = {inputs.username || ''} onChange = {handleChange}  />
                {errors.validationErrors.username && <span>{errors.validationErrors.username}</span>}
            </div>
            <div className="input">
                <label>Password: </label>
                <input type="password" name="password" id="password" value = {inputs.password || ''} onChange = {handleChange}  />
                {errors.validationErrors.password && <span>{errors.validationErrors.password}</span>}
            </div>
            {errors.serverErrors.length > 0 && errors.serverErrors.map((element, index) => (
                <div key = {index} style = {{color : 'red'}}>{element}</div>
            ))}
            <button type='submit'>Sign Up</button>
        </form>
    </div>
  )
}

export default SignupForm