import {prisma} from '@/prisma/prisma'

export async function POST(req, ){
    const {postcardId, recipientUserId, senderUserId, name, emoji, location} = await req.json();
    const firstName = name.split(' ')[0]
    try {
        const postcard = await prisma.postcard.update({
            where : {
                id : Number(postcardId)
            },
            data : {
                likes : {
                    increment : 1
                }
            }
        })
        try {

            //Create notification for when someone has "been there" on a postcard
            const response = await prisma.notifications.create({
                data : {
                    recipientUserId : Number(recipientUserId) ,
                    senderUserId : Number(senderUserId) ,
                    content : `${firstName} liked your postcard from ${location} ${emoji}` ,
                    postcardId : Number(postcardId)
                }
            })
            console.log('new notificaiton is ', response)

        } catch (err){
            console.log('error creating notification', err.message)
        }
        return Response.json(postcard)
    } catch (err) {
        return Response.json({message:err.message})
    }
}