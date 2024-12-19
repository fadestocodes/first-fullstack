

export async function POST  (req)  {
  const payload = await req.json();
  const newPost = await prisma.blogpost.create({
    data : {
        title : payload.title,
        userId : payload.userId,
        content : payload.content,
        category : payload.category,
        coverPhoto : payload.coverPhoto,
    }
  });


    return  Response.json(newPost);
}
