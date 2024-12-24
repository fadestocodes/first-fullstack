export async function POST(req){
    
    const { caption, country, countryCode, emoji, location, picture, userId } = await req.json();
    console.log('caption is ', caption)
    console.log('country is ', country)
    console.log('countryCode is ', countryCode)
    console.log('emoji is ', emoji)
    console.log('location is ', location)
    console.log('picture is ', picture)
    console.log('userId is ', userId)
    try {
        console.log('gonna try to create')
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