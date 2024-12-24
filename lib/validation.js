// 'use server'

import {z} from 'zod';

export const adminRequestForm = z.object({
    password : z.string().refine(password => password === 'biggiethegreat')
})


export const createBlogFormSchema = z.object({
    title : z.string().min(3, 'Title must have at least 3 characters'),
    category : z.string().min(1, 'Please select an option') ,
    coverPhoto : z.string().min(1, 'Cover photo required')
})

export const signUpValidation = z.object({
    name : z.string().min(3, {message:'Name must be at least 3 characters'}),
    email : z.string().email({message:'Must be valid email address'}),
    password : z.string().min(7, {message:'Must be at least 7 characters'})
        .regex(/[A-Z]/, {message:'Password must include at least one uppercase letter'})
        .regex(/[a-z]/, {message:'Password must include at least one lowercase letter'})
        .regex(/[0-9]/, {message:'Password must include at least one number'})
        .regex(/[@$!%*?&]/, {message:'Password must include at least one special character'}),
    confirmPassword : z.string()
}).refine((data) => data.password === data.confirmPassword, {
    path : ['confirmPassword'],
    message : 'Passwords must match'
} );