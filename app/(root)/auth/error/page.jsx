import React from 'react'

import biggieKawawa from '@/public/biggiekawawa.jpg'
import Image from 'next/image'

const ErrorPage = () => {
  return (
    <div className="w-screen h-screen relative">
      {/* Full-page background image */}
      <Image 
        src={biggieKawawa} 
        alt="restricted page photo" 
        className="object-cover w-full h-full absolute top-0 left-0" 
      />
      {/* Semi-transparent overlay */}
      <div className="bg-black bg-opacity-15 w-full h-full absolute top-0 left-0"></div>
      {/* Content */}
      <div className="absolute z-30 text-white inset-0 flex flex-col justify-center items-center">
        <h1 className="text-center">Something's wrong</h1>
        <p className="!my-0">This is Biggie, and he senses something went wrong.</p>
      </div>
    </div>
  )
}

export default ErrorPage