import React from 'react'
import { getAllComments } from '@/prisma/prismaQueries'

export async function GET(req, {params}) {

    const {blogId} = await params;

    // console.log('blogId is really ', typeof(blogId));

    try{
        const allComments = await getAllComments(Number(blogId))
        return Response.json(allComments);

    } catch (err) {
        console.error('unexpected error', err);
        return Response.json({message : 'Unexpected error', error : err.message});
    }

}
