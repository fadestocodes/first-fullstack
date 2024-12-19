import {prisma} from '@/prisma/prisma'

export async function GET(){
    try {
        const response = await prisma.comments.findMany({
            where : {
                postcardId : {
                    not : null
                }
            }
        })
        return Response.json(response);
    } catch (err) {
        return Response.json({message : err.message});
    }
}

export async function POST(req){
    try{
        const { content, userId, parentCommentId, postcardId  } = await req.json();
        const comment = await prisma.comment.create({
            data : {
                content,
                userId,
                parentCommentId,
                postcardId
            }
        });
        console.log('comment added was ', comment);
        return Response.json(comment);
    } catch (err) {
        console.log('couldnt post comment')
        return Response.json({message : err.message})
    }

}