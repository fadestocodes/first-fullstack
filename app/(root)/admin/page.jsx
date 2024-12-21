'use client';

import React, { useEffect, useState} from 'react'
import { Card,  CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const AdminHome =  () => {
  


  const session = useSession();
  const [errors, setErrors] = useState('');
  const router = useRouter
  
  useEffect(()=>{
    if (!session || session?.data?.user?.role !== 'ADMIN') {
      router.push('/auth/error') 
      }
  }, [])



  const handleSubmit = async ( event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
  const password = formData.get('password');
  const email = session.data.user.email;
    const reqObj = { email , password};
    try {
      // adminRequestForm.parse(zObject);
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin`, {
        method : 'POST',
        headers : {
          'Content-Type' : 'application/json'
        },
        body : JSON.stringify(reqObj)
      })
      
      const data = await response.json();
      console.log('data is ', data);
      if (data.success) {
        setErrors(false);
        try {
          const response = await fetch (`${process.env.NEXT_PUBLIC_API_URL}/api/admin/update`, {
            method : 'POST',
            headers : { 
              'Content-Type' : 'application/json'
            },
            body : JSON.stringify(email)
          });
          const data = await response.json();
          console.log('resposne from update : ', data);

        } catch (err) {
          console.error("couldn't update role", err);
        }

          // const updatedSession = await getSession();
  
          // if (updatedSession) {
          //   session.user.role = updatedSession.user.role;
          // }
          window.location.href = '/';
      } else {
        setErrors(data.message);
      }
    } catch (err) { 
      setErrors(data.message);
      console.log(err.message);
      }
    }

  

    
    
  return (
    <div className='flex flex-col justify-center items-center w-full'>
    {session?.data?.user 
      && session?.data?.user.role === 'GUEST' 
        ? (
          <div className='admin-request-card flex flex-col justify-center items-center w-full'>
            <Card className='admin-card flex flex-col items-center justify-center py-10 px-10 gap-8'>
              <CardTitle>Admin Access</CardTitle>
              <form method='POST' onSubmit={handleSubmit}>
                <div className='flex flex-col items-center justify-center gap-5'>
                  <label htmlFor="">Enter password for admin access</label>
                  <Input type='password' name='password' required />
                  {errors && <p className='text-red-500'>Invalid password</p>}
                  <Button variant='default'>Request Access</Button>
                </div>
              </form>
            </Card>
          </div>
        ) 
       
      : (
        <div>
          <Card className='p-20 flex flex-col gap-6 w-full items-center justify-center'>
            <CardTitle><p>You&apos;re Already an Admin</p></CardTitle>
          </Card>
        </div>
      )
    }
  </div>
  )
}

export default AdminHome