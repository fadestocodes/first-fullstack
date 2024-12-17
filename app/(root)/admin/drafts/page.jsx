'use client'

import React, { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { getDrafts } from '@/prisma/prismaQueries'
import {Card, CardTitle, CardContent, CardHeader, CardDescription} from '@/components/ui/card'
import Image from 'next/image'
import {Badge} from '@/components/ui/badge'
import { useRouter } from 'next/navigation'

const DraftsPage =  () => {
  
    const router = useRouter();
    const [loadingData, setLoadingData] = useState(true);
    const [savedDrafts, setSavedDrafts] = useState({});

    useEffect(()=>{
        const fetchDrafts = async () => {
            const data = await fetch('/api/post/get-drafts');
            const savedDrafts = await data.json();
            console.log('saved drafts : ', savedDrafts);
            setSavedDrafts(savedDrafts);
            setLoadingData(false)
        }
        fetchDrafts();
    }, [])

    const shortenContent = (content) => {
        const text = content.replace(/<[^>]*>/g, ''); 

        return text.length > 300 ? text.substring(0, 150) + '...' : text;
    }

    const reformatDashes = (input) => {
        return input
        .replace(/-/g, ' ') // Replace all '-' with spaces
        .replace(/\b\w/g, (char) => char.toUpperCase()); // Capitalize the first letter of each word
    }

    const editPost = (id) => {
        router.push(`/admin/edit/${id}`)
    }


    if (loadingData) {
        return (
            <div className="w-full h-full flex justify-center items-center">
                <p>Loading...</p>  {/* Show a loading indicator while data is fetching */}
            </div>
        );
    }

    return (
        <div>
        <div className='w-full h-full grid-cols-1 grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3  '>
        { savedDrafts.map((draft)=>(
            <div key={draft.id} >
                <Card onClick={()=>editPost(draft.id)} className=' h-[30rem] relative justify-center items-center flex flex-col gap-4  cursor-pointer hover-effect overflow-hidden m-4'>
                        <div className=' w-full h-[15rem] flex flex-col justify-stretch items-stretch'>
                            <img src={draft.coverPhoto }  alt='cover photo for post' className='rounded-lg object-cover w-full h-[16rem] absolute left-0 top-0' ></img>
                                <Badge className='absolute top-5 left-4'>Draft</Badge>
                                <Badge className='absolute top-5 left-20'>{reformatDashes(draft.category)}</Badge>
                        </div>
                        <CardContent className='flex flex-col justify-center items-center gap-4 '>
                            <div className='overflow-hidden flex flex-col gap-4'><p className='text-lg font-bold'>{draft.title }</p><hr/><p   dangerouslySetInnerHTML={{__html :shortenContent( draft.content)}}></p></div>
                        </CardContent>
            </Card>
            </div>
        )) }
    </div>
    </div>
  )
}

export default DraftsPage