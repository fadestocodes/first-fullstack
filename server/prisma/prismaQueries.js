import {PrismaClient} from '@prisma/client';
import prisma from './prisma.js';

async function addUser ( userData) {
    return await prisma.user.create({
        data : {
            firstName : userData.firstName || null ,
            lastName : userData.lastName || null ,
            username : userData.username || null,
            email : userData.email || null,
            password: userData.password || null,
            googleId: userData.googleId || null,
            role : userData.role || undefined,
            picture : userData.picture || null
        }

    })
}

async function findUser(email){
    return await prisma.user.findUnique({
        where : {
            email : email
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
        },
        orderBy : {
            createdAt : 'desc'
        }
       
    })
}

async function getSinglePost(id){
    return await prisma.blogpost.findUnique({
        where : {
            id : id
        },
        include : {
            user : true
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

async function addComment({content, userId, blogId, parentCommentId}){
    return await prisma.comment.create({
            data : {
                content,
                userId,
                blogId,
                parentCommentId
            },
            include : {
                replies : true,
                users : true,
            }
    })
}

async function getAllComments(blogId){
    return await prisma.comment.findMany({
        where : {
            blogId : blogId
        },
        include : {
            users : {
                select : {
                    firstName : true,
                    picture : true
                }
            },
            replies : {
                include : {
                    replies : {
                        include : {
                            replies : true,
                            users : true
                        }
                    },
                    users : true
                }
            },
            users : true
        },
        orderBy : {
            created : 'desc'
        }
    })
}



export {addUser, updateRole, addBlogpost, getAllPosts, 
    getUnpublishPosts, getPublishPost, getSinglePost, publishPost, addComment, findUser,
    getAllComments};