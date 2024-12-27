import {prisma } from '@/prisma/prisma'

export async function GET(req, {params}){
    const {userId} = await params;
    console.log('user id is ', userId); 
    try {
        // console.log('trying to get all notifs: ')
        const allNotifications = await prisma.notifications.findMany({
            where : {
                recipientUserId : Number(userId)
            },
            orderBy : {
                createdAt : 'desc'
            }
        })
        // console.log('all notifs ', allNotifications);
        return Response.json(allNotifications)
    } catch(err) {
        console.log('error: ', err.message)
        return Response.json({message : err.message})
    }
}