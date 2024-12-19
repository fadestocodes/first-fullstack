'use server'

import React from 'react'
import { prisma } from '../prisma/prisma';

const authenticateAdmin = async (emailData, passwordData) => {
  
    if (passwordData === process.env.ADMIN_PASSWORD){
        try {
            await prisma.user.update({
                where : {
                    email : emailData,

                },
                data : {
                    role : 'ADMIN'
                }
                
            })
        } catch (err) {
            console.error('Unexpected error ', err)
        }
    } else {
        return null;
    }


}

export default authenticateAdmin
