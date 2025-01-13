import { prisma } from "@/prisma/prisma";

export async function POST  (req)  {
    const {id} = await req.json();
    console.log('the post to delet is ID:', id)
  const res = await prisma.blogpost.delete({
    where : {
        id
    }
  });

  

    return  Response.json(res);
}
