import {prisma} from '@/prisma/prisma'

export async function GET(){
    try {
        const data = await prisma.comment.findMany({
            where : {
                parentCommentId : { not : null}
            },
            include : {
                users : true,
            }
        })
        return Response.json(data);
    } catch (err) {
        return Response.json({message : err.message})
    }
}