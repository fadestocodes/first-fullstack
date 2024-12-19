'use client'
import {Button} from '@/components/ui/button'
import { ExternalLink} from 'lucide-react'

import React from "react";
import { useRouter } from 'next/navigation';

export const RedirectButton= ({postId}) => {
    const router = useRouter();
    const handleClick = () => {
        console.log('post id is ', postId);
      router.push(`/blog/${postId}`)
    }
    return (
      <Button  variant='outline' onClick = {handleClick}>Read more <ExternalLink /></Button>
    )
  }