import React from 'react'
import SignupForm from '../components/SignupForm';
import { useForm } from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {Input} from '../components/ui/input'
import {Button} from '../components/ui/button'
import ZodSignupForm from '../components/Zod';

const Signup = () => {
  

  // const onSubmit =  async (data : any) => {
  //   // event.preventDefault();
  //       try {
  //           const response = await fetch ('http://localhost:3000/sign-up', {
  //               method : 'POST',
  //               headers : {
  //                   'Content-Type' : 'application/json'
  //               },
  //               body : JSON.stringify(data)
  //           });
  //           const data = await response.json();

  //           if (response.ok){
  //               navigate('/');
  //               console.log("Success", data.message);
  //           } else {
  //               console.error('Data is: ', data);
  //               console.error('Data Error is: ', data.error);
  //               setErrors( prevErrors => ({
  //                   ...prevErrors,
  //                   serverErrors : [ data.error]
  //               }) );
  //           }
            
  //       } catch (err) {
  //           console.error(err);
  //       }
 
  //   }

  
  return (
    <>
      <ZodSignupForm></ZodSignupForm>

    </>
  )
}

export default Signup;