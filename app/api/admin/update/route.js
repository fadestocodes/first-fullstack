import {prisma} from '@/prisma/prisma';
// import { NextResponse } from 'next/server';

export const POST = async (request) => {
    const  email  = await request.json();
    const user =  await prisma.user.update({
        where : {
            email
        },
        data : {
            role : 'ADMIN'
        }
    })
    console.log('updated user is : ', user);
    return Response.json(user);

}
