import {prisma} from '@/prisma/prisma'
import bcrypt from 'bcrypt'

export async function POST(req){
    const { name, email, password, picture } = await req.json();
    const hashedPassword = await bcrypt.hash(password, 10)
    try {
        const existingUser = await prisma.user.findUnique({
            where : {
                email : email
            }
        })
        if (existingUser){
            console.log('existing user')
            return Response.json({message : 'User already exists'}, {status:400});
        } else {
            try {
                const account = await prisma.user.create({
                    data : {
                        name,
                        email,
                        password : hashedPassword,
                        picture
                    }
                })
                console.log('created user', account)
                return Response.json(account);
            } catch (err) {
                console.log('couldnt create account')
                return Response.json({message : err.message})
            }
        }
    } catch (err) {
        console.log('not working')
        return Response.json({message : err.message})
    }
}