import React from 'react'
import { getAllComments } from '@/prisma/prismaQueries'

export async function GET(req) {

    const {blogId} = await req.json()
    try{
        const allComments = await getAllComments(blogId)
        return Response.json(allComments);

    } catch (err) {
        console.error('unexpected error', err);
        return Response.json({message : 'Unexpected error', error : err.message});
    }

}
