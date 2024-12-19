import {prisma} from '@/prisma/prisma'

export async function GET(){
    try {
        const allPostcards = await prisma.postcard.findMany({
            include : {
                user : true,
                comments : {
                    include : {
                       users : true
                    },
                    orderBy : {
                        created : 'desc'
                    }
                }
            },
            orderBy : {
                createdAt : 'desc'
            }
        })
        return Response.json(allPostcards)
    } catch (err){
        return Response.json({message : err.message});
    }
}