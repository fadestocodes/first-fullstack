'use client'

import React, { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import {Card, CardContent, CardFooter} from '@/components/ui/card'
import {Badge} from '@/components/ui/badge'
import { useRouter } from 'next/navigation'
import {Button} from '@/components/ui/button'

const DraftsPage =  () => {
    
 
    const router = useRouter();
    const [loadingData, setLoadingData] = useState(true);
    const [savedDrafts, setSavedDrafts] = useState({});
    const [deleteModal, setDeleteModal] = useState(null);
    const session = useSession();


    useEffect(() => {
        if (!session || session?.data?.user?.role !== 'ADMIN') {
        router.push('/auth/error') 
        }
    }, [session, session.status, router]);


    useEffect(()=>{
        const fetchDrafts = async () => {
            const data = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/post/get-drafts`);
            const savedDrafts = await data.json();
            console.log('saved drafts : ', savedDrafts);
            setSavedDrafts(savedDrafts);
            setLoadingData(false)
        }
        fetchDrafts();
    }, [])

    useEffect(()=>{
        const fetchDrafts = async () => {
            const data = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/post/get-drafts`);
            const savedDrafts = await data.json();
            console.log('saved drafts : ', savedDrafts);
            setSavedDrafts(savedDrafts);
            setLoadingData(false)
        }
        fetchDrafts();
    }, [])


    useEffect(() => {
        if (session.status === 'loading') {
          return; // Wait for session to load
        }
    
        if (!session || session?.data?.user?.role !== 'ADMIN') {
          router.push('/'); // Redirect to login page
        }
      }, [session, session.status, router]);


    
      if (session.status === 'loading') {
        return <div>Loading...</div>;
      }



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

    const deletePost = async (id) => {
        const payload = {
            id
        }
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/post/delete`, {
                method : 'POST',
                headers: {
                    'Content-type' : 'application/json'
                },
                body : JSON.stringify(payload)
            })
            const data = await response.json();
            console.log('resposne from deleting', data)
            // window.location.reload();
            setSavedDrafts((prevDrafts) => prevDrafts.filter((draft) => draft.id !== id));

        } catch (err) {
            console.log('Error deleting post', err)
        }
        setDeleteModal(false);

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
           
        <div className='w-full h-full grid-cols-1 grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 lg:px-20 '>
       

        { savedDrafts.map((draft)=>(
            <div key={draft.id} >
                <Card className='  relative justify-center items-center flex flex-col gap-2    overflow-hidden m-4'>
                        <div className=' w-full h-[15rem] flex flex-col justify-stretch items-stretch'>
                            <img src={draft.coverPhoto }  alt='cover photo for post' className='object-cover w-full h-[16rem] absolute left-0 top-0' ></img>
                                <Badge className='absolute top-5 left-4'>Draft</Badge>
                                <Badge className='absolute top-5 left-20'>{reformatDashes(draft.category)}</Badge>
                        </div>
                        <CardContent className='flex flex-col justify-center items-center  '>
                            <div className='overflow-hidden flex flex-col '><p className='text-lg font-bold mt-5 mb-2'>{draft.title }</p><hr className='my-0'/><p className='!my-2'  dangerouslySetInnerHTML={{__html :shortenContent( draft.content)}}></p></div>
                        </CardContent>
                        <CardFooter className='w-full justify-center gap-4'>
                            <Button variant='outline' onClick={()=>editPost(draft.id)}>
                                Edit
                            </Button>
                            <Button variant='outline' onClick={()=>setDeleteModal(draft)}>
                                Delete
                            </Button>
                            { deleteModal && (
                                <div onClick={()=>setDeleteModal(null)} className="fixed inset-0 bg-black bg-opacity-15 z-50 flex justify-center items-center">
                                    <div onClick={(e)=>e.stopPropagation()} className=' justify-center items-center flex flex-col w-96 h-60'>
                                        <Card >
                                            <CardContent>
                                                <p className='my-8'>Are you sure you want to delete the post: <strong>{deleteModal.title}?</strong></p>
                                                <div className="flex gap-3 items-center justify-center">
                                                    <Button onClick={()=> setDeleteModal(null)}>Cancel</Button>
                                                    <Button onClick={()=>deletePost(deleteModal.id)}>Delete</Button>
                                                </div>

                                            </CardContent>
                                        </Card>
                                    </div>
                                </div>
                            ) }
                            
                          
                        </CardFooter>
            </Card>
            </div>
        )) }
    </div>
    </div>
  )
}

export default DraftsPage