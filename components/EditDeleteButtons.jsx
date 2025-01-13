'use client'

import React, { useState } from 'react'
import { Card, CardContent } from './ui/card';
import {Button} from '@/components/ui/button'
import {useRouter} from 'next/navigation';

const EditDeleteButtons = ({post}) => {
    const [ deleteModal, setDeleteModal ] = useState(null);
    const router = useRouter();

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
            // setSavedDrafts((prevDrafts) => prevDrafts.filter((draft) => draft.id !== id));

        } catch (err) {
            console.log('Error deleting post', err)
        }
        setDeleteModal(false);
        window.location.reload();

    }


  return (
    <div>
        <div className="flex-row flex justify-center items-center gap-3">
            <Button  onClick={()=>editPost(post.id)}>
                Edit
            </Button>
            <Button  onClick={()=>setDeleteModal(post)}>
                Delete
            </Button>
        </div>
        { deleteModal && (
            <div className='fixed inset-0 bg-black bg-opacity-65 z-50 flex justify-center items-center'>
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
    </div>
  )
}

export default EditDeleteButtons