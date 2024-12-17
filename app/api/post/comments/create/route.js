import React from 'react'
import { addComment, addUser, findUser } from '../../../../../prisma/prismaQueries'

export async function POST(req) {
    
    const {firstName, lastName, email, picture, comment, blogId, parentId} = await req.json();
    // const params = await req.json();
    // console.log('params are ', params);

    const checkUser = await findUser(email);
    let userId;
    console.log('trying to post comment')

    if (!checkUser) {
        try {
            const userData = {
                firstName,
                lastName : lastName || null,
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
        return Response.json({newComment});

    } catch (err) {
        console.error("couldn't create comment", err)
        return Response.json({message : "Couldn't create comment", error : err.message})
    }

}
