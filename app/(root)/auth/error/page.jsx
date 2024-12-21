import React from 'react'

import biggieKawawa from '@/public/biggiekawawa.jpg'
import Image from 'next/image'

const ErrorPage = () => {
  return (
    <div className='w-full h-full  flex justify-center items-center' >
        <Image src={biggieKawawa} alt="restriced page photo" className='object-cover relative w-full h-full' />
        <div className='absolute text-white top-1/2 flex flex-col justify-center items-center'>
            <h1 className='  justify-center items-center text-center w-full h-full' >Restricted Access</h1>
            <p>You need admin permissions to access this page. </p>
        </div>
    </div>
  )
}

export default ErrorPage