import {prisma} from '@/prisma/prisma'

export async function GET(req) {
    const {take, cursor } = await req.json();
    try {
        const results = await prisma.blogpost.findMany({
            take : parseInt(take), // Number of posts to fetch
            skip: cursor ? 1 : 0, // Skip the cursor itself
            cursor: cursor ? { id: cursor } : undefined, // Start after the given blogpost ID
            include: {
                user: {
                    select: {
                        user: true,
                        comments: true,
                    },
                },
            },
            orderBy: {
                createdAt: 'desc', // Fetch the latest posts first
            },
    
        });
        return Response.json(results)
    } catch (err) {
        return Response.json({message : err.message});
    }
}
