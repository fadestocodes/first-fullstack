'use server'

import React from 'react';
import {NextResponse} from 'next/server';


export const POST = async ( request ) => {
    const {email, password} = await request.json();

    if (!email || !password){
        return NextResponse.json(
            {message : 'Email and password are required'},
            {status : 400}
        );
    }

    if (password !== process.env.ADMIN_PASSWORD){
        return NextResponse.json(
            {message : 'Invalid Password'},
            {status : 401}
        )
    }
    return NextResponse.json(
        {message : 'Success', success : true},
        {status:200}
    )
}
