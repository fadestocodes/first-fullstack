'use client'

import { useSession } from 'next-auth/react';
import React, { useState } from 'react';
import { signIn } from 'next-auth/react';
import {Button} from '@/components/ui/button'
import { CircleX, X } from 'lucide-react';
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card'
import GoogleIcon from '@mui/icons-material/Google';

export default function LoginModal( {onSuccess, comment , onClose  }  ) {
  const [showModal, setShowModal] = useState(true);
  console.log('your comment is ', comment);

  const handleLogin = async (provider) => {
    sessionStorage.setItem('userComment', comment);
    try {
        // setCommentPosted(true);
        const result = await signIn(provider);
        console.log('login result', result);
        // const updatedSession = await fetch('http://localhost:3000/api/auth/session').then((res)=>res.json());
        // onSuccess(updatedSession);

    } catch (err) {
        console.log('errorrr', err)
    }

  };

  return (
    <div>
      {showModal && (
        <div className="modal  z-[60] fixed flex justify-center items-center top-0- left-0 bottom-0 right-0 inset-0  m-0 p-0 bg-black bg-opacity-50"  >
          <Card className="modal-content p-8  relative flex gap-4 flex-col items-center justify-center w-96  ">
            <X  variant='secondary' className='size-5 absolute top-2 right-2 cursor-pointer text-gray-300' onClick={onClose}/>
            <h3 className='font-bold leading-3 mt-6'>Sign In</h3>
            <p>Please log in to post your comment</p>
            <Button  className='w-60' variant='outline' onClick={() => handleLogin('google')}><GoogleIcon sx={{ color: '#4285F4'}}/>Sign in with Google</Button>
            <Button className='w-60' variant='outline' onClick={() => handleLogin('github')}>Sign in with GitHub</Button>
            <Button variant='destructive' onClick={onClose} >Cancel</Button>
          </Card>
        </div>
      )}
    </div>
  );
}
