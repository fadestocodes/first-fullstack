'use client';

import React, {useEffect, useState, useActionState} from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {useSession, signIn, signOut } from 'next-auth/react';
import authenticateAdmin from  '@/lib/authenticateAdmin'
import {adminRequestForm} from '@/lib/validation'
import { useRouter } from 'next/navigation';

const AdminHome =  () => {

  const session = useSession();
  const [errors, setErrors] = useState(false);
  const router = useRouter();



  const handleSubmit = async (prevState, formData) => {

    const password = formData.get('password');
    const email = session.data.user.email;
    const reqObj = { email , password};
    try {
      // adminRequestForm.parse(zObject);
      const response = await fetch('/api/admin', {
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
          const response = await fetch ('/api/admin/update', {
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
        setErrors(true);
      }
    } catch (err) {
      setErrors(true);
      }
    }

    const [state, formAction, isPending] = useActionState(handleSubmit, '' )

    const refreshSession = async ()=>{
      await getSession();
    }

    
    
  return (
    <div className='flex flex-col justify-center items-center w-full'>
    {session?.user 
      ? session.user.role === 'ADMIN' 
        ? (
          <div className='admin-request-card flex flex-col justify-center items-center w-full'>
            <Card className='admin-card flex flex-col items-center justify-center py-10 px-10 gap-8'>
              <CardTitle>Admin Access</CardTitle>
              <form onSubmit={handleSubmit}>
                <div className='flex flex-col items-center justify-center gap-5'>
                  <label htmlFor="">Enter password for admin access</label>
                  <Input type='password' name='password' required />
                  {errors && <p className='text-red-500'>Invalid password</p>}
                  <Button variant='default' type='submit'>Request Access</Button>
                </div>
              </form>
            </Card>
          </div>
        ) 
        : <div>Access Denied</div>  // If the user is not an admin
      : (
        <div>
          <Card className='p-20 flex flex-col gap-6 w-full items-center justify-center'>
            <CardTitle>You're Already an Admin</CardTitle>
          </Card>
        </div>
      )
    }
  </div>
  )
}

export default AdminHome