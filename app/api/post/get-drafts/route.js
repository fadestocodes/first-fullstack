import { getDrafts } from "@/prisma/prismaQueries"

export async function GET(){
    const savedDrafts = await getDrafts();
    
    // console.log('saved drafts is', savedDrafts);
    return Response.json(savedDrafts);
}