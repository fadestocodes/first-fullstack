import {prisma } from '@/prisma/prisma'

export async function POST(req){
    const {maxNotifId, userId} = await req.json();
    // console.log('maxnnotifid', maxNotifId)
    // console.log('userId', userId)
    try{
        const response = await prisma.notifications.updateMany({
            where : {
                id : { lte:maxNotifId },
                isRead : false,
                recipientUserId : userId
            },
            data : {
                isRead : true
            }
        })
        return Response.json(response)
    } catch (err) {
        return Response.json({message : err.message})
    }

}