import { addComment, addUser, findUser } from '@/prisma/prismaQueries'
import {prisma} from '@/prisma/prisma'

export async function POST(req) {
    
    const {name, email, picture, comment, blogId, parentId} = await req.json();
    // const params = await req.json();
    // console.log('params are ', params);

    const checkUser = await findUser(email);
    let userId;
    console.log('trying to post comment')

    if (!checkUser) {
        try {
            const userData = {
                name,
                email,
                googleId ,
                role,
                picture,
            }
            const newUser = await addUser(userData);
            userId = newUser.id;

        } catch(err) {
            return Response.json({message : "Couldn't add new user", error : err.message});
        }

    } else {
        userId = checkUser.id
    }
    
    try {
        console.log('the parent id is ', parentId);
        const newComment = await addComment({
            content : comment, 
            userId,
            blogId : Number(blogId),
            parentCommentId : Number(parentId) || null
        });

        // notification to blog author when user comments
        
        try {
            const recipientUser = await prisma.blogpost.findUnique({
                where : { id : Number(blogId) },
                select : { userId : true }
            })
            
            await prisma.notifications.create({
                data : {
                    recipientUserId : recipientUser.userId ,
                    senderUserId : userId,
                    blogpostId : Number(blogId),
                    content : `${name.split(' ')[0]} commented on your post: ${comment}`,
                }
            })
        } catch (err) {
            console.log('error ',err.message)
        }

        // notification to parent commentor when someone replies
        if (parentId){
            try {

                const recipientUser = await prisma.comment.findUnique({
                    where : { id : Number(parentId) },
                    select : { userId : true }
                })

                await prisma.notifications.create({
                    data : {
                        recipientUserId : recipientUser.userId ,
                        senderUserId : userId,
                        blogpostId : Number(blogId),
                        content : `${name} replied to your comment: ${comment}`,
                    }
                })
            } catch (err) {
                console.log('error ',err.message)
            }
        }


        return Response.json({newComment});

    } catch (err) {
        console.error("couldn't create comment", err)
        return Response.json({message : "Couldn't create comment", error : err.message})
    }

}
