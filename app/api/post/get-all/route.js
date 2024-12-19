import React from 'react'
import { getAllPosts } from '@/prisma/prismaQueries'

export async function GET() {
    
    try {
        const allPosts = await getAllPosts();
        return Response.json(allPosts);


    } catch (err) {
        return Response.json({message : 'unexpexted error', err})
    }


}
