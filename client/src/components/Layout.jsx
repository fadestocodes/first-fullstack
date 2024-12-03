import React from 'react'
import Navbar from './Navbar'

const Layout = ({children}) => {
  return (
<div className='flex flex-col justify-center items-center w-full border-solid border-5' >
    <div>
        <Navbar />
    </div>
    <div className='px-12 py-20 w-full h-full flex flex-col justify-start items-center '>
        {children }
    </div>
    <div>

    </div>
    <div>

    </div>
</div>

)
}

export default Layout