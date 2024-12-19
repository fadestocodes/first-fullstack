export async function POST(req){
    
    const { caption, country, countryCode, emoji, location, picture, userId } = await req.json();
    
    try {
        const postcard = await prisma.postcard.create({
            data : {
                picture, 
                caption, 
                location, 
                country,
                countryCode,
                emoji,
                userId,
    
            }
        })
    
        console.log('created postcard is ', postcard);
        return Response.json(postcard);
    } catch (err) {
        return Response.json({message : err.message});
    }

}