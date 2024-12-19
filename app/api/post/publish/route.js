
import React from 'react'
import { getSinglePost } from '@/prisma/prismaQueries';
import { prisma } from '@/prisma/prisma';

export async function POST  (req) {
  const payload = await req.json();
  const postId = Number(payload.postId)
  const userId = Number(payload.userId)

    console.log('trying to debug');
  if (payload.postId){
    try {
        const post = await getSinglePost(postId);
          console.log('Found existing post', post)
          const updatedPost = await prisma.blogpost.update({
              where : {
                  id : postId
              },
              data : {
                title : payload.title,
                userId : userId,
                content : payload.content,
                category : payload.category,
                coverPhoto : payload.coverPhoto,
                isPublished : true,
                lastUpdated : new Date()
              }
          })
          console.log('updated post is ', updatedPost);
          return Response.json(updatedPost)

    } catch(err){
        console.log('error')
        return Response.json({message : "Couldn't find exisiting post", err})
        
    }
    
    
} else {
    
    
    
    try {
        const post = await prisma.blogpost.create({
            data : {
                title : payload.title,
                userId : userId,
                content : payload.content,
                category : payload.category,
                coverPhoto : payload.coverPhoto,
                isPublished : true
            }
        })
        console.log('created new post and published ', post)
        return Response.json(post);
    } catch (err) {
        console.log('error')
        return Response.json({message : "Couldn't publish and create new post", err})
    }


  }
}