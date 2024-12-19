import { updatePost } from '@/prisma/prismaQueries';

export async function POST (req){
    const payload = await req.json();
    console.log('payload is ', payload)
    const { content, title, category, coverPhoto  } = payload
    const userId = Number(payload.userId);
    const postId = Number(payload.postId);
    const newPost = await updatePost({userId, content, title, category, coverPhoto, postId});
return  Response.json(newPost);
}

