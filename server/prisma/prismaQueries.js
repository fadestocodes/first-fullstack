import {PrismaClient} from '@prisma/client';
import prisma from './prisma.js';

async function addUser ( firstName, lastName, username, email, password ) {
    return await prisma.user.create({
        data : {
            firstName,
            lastName,
            username,
            email,
            password
        }

    })
}


async function updateRole (userId, newRole){
    await prisma.user.update({
        where : {
            id : userId
        },
        data : {
            role : newRole
        }
    })
}

async function addBlogpost(userId, content, title, city, country, category ){
    await prisma.blogpost.create({
        data : {
            userId,
            content,
            title,
            city,
            country,
            category
        }
    })
}

async function getAllPosts(){
    return await prisma.blogpost.findMany({
        where : {
            isPublished : true
        }
    })
}

async function getUnpublishPosts(){
    return await prisma.blogpost.findMany({
        where : {
            isPublished : false
        }
    })
}

async function getPublishPost( ){
    return await prisma.blogpost.findMany({
        where : {
            isPublished : true
        }
       
    })
}

async function getSinglePost(id){
    return await prisma.blogpost.findUnique({
        where : {
            id : id
        }
    })
}

async function publishPost(postId){
    console.log('Publishing post with ID:', postId);
    try {
        await prisma.blogpost.update({
            where : {
                id : postId
            },
            data : {
                isPublished : true
            }
        })

    } catch (err) {
        console.error('Error updating post', err);
    }
}


export {addUser, updateRole, addBlogpost, getAllPosts, getUnpublishPosts, getPublishPost, getSinglePost, publishPost};