"use client";

import { signIn } from "next-auth/react";
import {Button} from '@/components/ui/button'
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import { Mail } from "lucide-react";
import {Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription} from '@/components/ui/card'
import { useEffect, useState } from "react";
import { Input } from "./ui/input";
import {signUpValidation} from '@/lib/validation';
import {Label} from '@/components/ui/label';
import {Avatar, AvatarImage} from '@/components/ui/avatar'

export default function SignInButtons() {

  const [signupModal, setSignupModal] = useState(false);
  const [errors, setErrors] = useState({})
  const [inputs, setInputs ] = useState({
    name : '',
    email : '',
    password : '',
    confirmPassword : '',
    picture : '',
    loginEmail : '',
    loginPassword : ''
  })
  const [imageLoading, setImageLoading] = useState(false);
  const [ signupComplete, setSignupComplete ] = useState(false);
  

  const handleSignupClick = () => {
    setSignupModal(true);
  }

  const handleChange = (event) => {
    
    const name = event.target.name;
    const value = event.target.value;
    
    setInputs(prevData => ({
      ...prevData,
      [name] : value
    }))

  }
  
  useEffect(()=>{
    if (signupModal){
      const {picture, ...fieldsToValidate} = inputs;
      console.log('picture is', picture)
      const validation = signUpValidation.safeParse(fieldsToValidate);
      if (validation.success){
        console.log('validation success', validation.data);
        setErrors({});
      } else {
        const formattedErrors = validation.error.errors.reduce((acc,err)=>{
          acc[err.path[0]] = err.message;
          return acc;
        }, {});
        setErrors(formattedErrors);
        console.log('validation errors:', formattedErrors);
      }

    }

  },[inputs])

  const imageUpload = async (event) => {
    setImageLoading(true);
    const file = event.target.files[0]
    const fileName =  file.name;
    const fileType = file.type;
    console.log('tryting')
    try {
      const data = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/presigned-url`, {
        method : "POST",
        headers : {
          'Content-type' : 'application/json'
        },
        body : JSON.stringify({fileName, fileType})
      })
      console.log('data from presignedurl', data)
      const {url, location} = await data.json();
      
      const uploadResponse = await fetch (url, {
        method : 'PUT',
        body : file
      })
      if (!uploadResponse){
        throw new Error ('Problem uploading image to S3')
      }
      console.log('url is ', url)
      console.log('location is ', location)
      setInputs((prevData)=>({
        ...prevData,
        picture : location
      }))
      setImageLoading(false);
      console.log('inputs are', inputs)
    } catch (err) {
      console.log('error message is', err.message);
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    const data = {
      name : inputs.name,
      email : inputs.email,
      password : inputs.password,
      picture : inputs.picture
    }
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/account/create`, {
        method : 'POST',
        headers : {
          'Content-type' : 'application/json'
        },
        body : JSON.stringify(data)
      })
      console.log('response is ', response)
      const responseData = await response.json();
      console.log('response data is ', responseData)
      if (!response.ok){
        setErrors(prevData => ({
          ...prevData,
          email : responseData.message
        }))
      } else {
        setErrors({});
        setSignupComplete(true);
        setSignupModal(false);


      }  

    } catch (err) {
      console.log('Error is ', err.message)
    } 


  }

  const goBackToSignin = () => {
    setSignupComplete(false);
    setSignupModal(false);
  }

  const handleCredentialsSignin = async (event) => {
    event.preventDefault();
    console.log('inputs are ', inputs)
    const response = await signIn('credentials', {
      redirect : false,
      email : inputs.loginEmail,
      password : inputs.loginPassword
    })
    
    if (response?.error) {
      console.log('Sign in error:', response.error);
      setErrors(prevData => ({
        ...prevData,
        loginPassword : response.error
      }))
    } else {
      console.log('Sign in success!');
      window.location.reload();
      // Handle the successful login (e.g., redirect to a different page)
    }
  }

  return (
    <Card className="flex flex-col justify-center items-center gap-3 px-2 pt-8 ">

          { signupModal ? (
            <form>
              <CardHeader>
                <CardTitle><h2>Create an account</h2></CardTitle>
                <CardDescription></CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-3">
                  <div className="w-full justify-center items-center">
                    <Label>Profile picture*</Label>
                    <Input className="w-[70%] cursor-pointer " accept='image/*' name="picture" onChange={imageUpload} type="file"></Input>
                    {inputs?.picture && !imageLoading ? (
                      <div className=" w-full h-full flex justify-center items-center my-8">
                        <Avatar size='40' className="size-20 md:size-32">
                          <AvatarImage size='40' className="object-cover" src={inputs.picture} alt='User profile photo' ></AvatarImage>
                        </Avatar>
                      </div>
                    ) : imageLoading && (
                      <div className="spinner w-[150px] h-[150px]">
                      </div>
                    )}
                  </div>
                  <div>
                    <Label>Enter name*</Label>
                    { errors.name && <p className="text-red-400 !my-0 text-sm">{errors.name}</p> }
                    <Input name="name" type="text" placeholder="Jane/John Doe" onChange={handleChange} value={inputs.name}></Input>
                  </div>
                  <div>
                    <Label>Enter email*</Label>
                    { errors.email && <p className="text-red-400 !my-0 text-sm">{errors.email}</p> }
                    <Input name="email" type="email" placeholder="example@gmail.com" onChange={handleChange} value={inputs.email}></Input>
                  </div>
                  <div>
                    <Label>Enter password*</Label>
                    { errors.password && <p className="text-red-400 !my-0 text-sm">{errors.password}</p> }
                    <Input name="password" type="password" onChange={handleChange} value={inputs.password}></Input>
                  </div>
                  <div>
                    <Label>Confirm password*</Label>
                    { errors.confirmPassword && <p className="text-red-400 !my-0 text-sm">{errors.confirmPassword}</p> }
                    <Input name="confirmPassword" type="password" onChange={handleChange} value={inputs.confirmPassword}></Input>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="justify-center flex items-center"><Button onClick={handleSubmit}>Submit</Button></CardFooter>
            </form>
          ) : signupComplete ? (
            <div>
              <CardHeader>
                <CardTitle className="">Signup Complete!</CardTitle>
                <CardContent className="py-8">
                  <Button onClick={goBackToSignin}>Click here to sign in.</Button>
                </CardContent>
                <CardFooter></CardFooter>
              </CardHeader>
            </div>
          ) : (
          <div>
            <CardHeader>
              <CardTitle className="justify-center items-center flex flex-col"><h2>Sign In </h2></CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-3 md:w-96">
              <form className="flex flex-col gap-3" action={handleCredentialsSignin}>
                  { errors.loginPassword && <p className="text-red-400 !my-0 text-sm">{errors.loginPassword}</p> }
                <div className="flex flex-col gap-3">
                  <Label>Email address*</Label>
                  <Input placeholder="Email address*" name="loginEmail" value={inputs.loginEmail} onChange={handleChange} type="text" className="w-full" ></Input>
                </div>
                <div className="flex flex-col gap-3">
                  <Label>Password*</Label>
                  <Input placeholder="Password*" name="loginPassword" value={inputs.loginPassword} onChange={handleChange} type="password" className="w-full"></Input>
                </div>
                <Button  variant='default' onClick={handleCredentialsSignin} className="">
                <div className="flex justify-center items-center gap-3">
                  <Mail />
                  <p className="mb-6">Sign in with Email</p>
                </div>
              </Button>
              </form>
                <p onClick={handleSignupClick} className="text-xs !my-0 cursor-pointer text-[rgb(120,113,108)] hover:text-black text-center">Don't have an account? Sign up</p>
              <div className="flex items-center">
                <hr className="flex-grow border-t" /><span className="mx-4 text-xs">OR</span> <hr className="flex-grow border-t" />
              </div>
              <Button variant='outline' onClick={() => signIn('google')} className="">
                <div className="flex justify-center items-center gap-3">
                  <GoogleIcon sx={{ color: "#EA4335" }} className="m-0 p-0"/>
                  <p className="mb-6">Sign in with Google</p>
                </div>
              </Button>
              <Button disabled={true} variant='outline' onClick={() => signIn('facebook')} className="">
                <div className="flex justify-center items-center gap-3">
                  <FacebookIcon sx={{ color: "#4285F4" }} className="m-0 p-0"/>
                  <p className="mb-6">Sign in with Facebook</p>
                </div>
              </Button>
              <CardFooter className=" flex flex-col justify-center">
              </CardFooter>
            </CardContent>
          </div>
          )}
    </Card>
  );
}
