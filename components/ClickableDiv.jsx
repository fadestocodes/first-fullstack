'use client'

import React from 'react'
import { useRouter } from 'next/navigation'

const ClickableDiv = ({route, children, className}) => {

    const router = useRouter();
  return (
    <div className={className}  onClick={()=>router.push(route)}  >{children}</div>
  )
}

export default ClickableDiv