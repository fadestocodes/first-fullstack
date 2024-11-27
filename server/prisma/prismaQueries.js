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

export {addUser, updateRole};