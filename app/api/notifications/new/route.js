import {prisma } from '@/prisma/prisma'

export async function POST(req){

    const {maxNotifId, userId} = await req.json();
    console.log('maxnnotifid', maxNotifId)
    console.log('userId', userId)
    try{
        const response = await prisma.notifications.findMany({
            where : {
                id : { gt:maxNotifId },
                isRead : false,
                recipientUserId : userId
            },
            orderBy : { id: 'desc'}
        })
        return Response.json(response)
    } catch (err) {
        return Response.json({message : err.message})
    }

}