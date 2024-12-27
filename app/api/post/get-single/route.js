import { getSinglePost } from "@/prisma/prismaQueries"
import {prisma} from '@/prisma/prisma'

export async function POST(req){
    
    const {postId} = await req.json()

    await prisma.blogpost.update({
        where : {
            id : Number(postId)
        },
        data : {
            views : { increment: 1},
        }
    })

    
    const blogpost = await getSinglePost(Number(postId));
    // console.log('blogpost is ', blogpost);

    
    return Response.json(blogpost);
}