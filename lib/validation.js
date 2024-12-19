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