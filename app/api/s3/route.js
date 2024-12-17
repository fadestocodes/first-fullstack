'use server';

import { S3Client, GetObjectCommand, PutObjectCommand, GeneratePresignedUrlCommand, ListObjectsCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';




import { NextRequest, NextResponse } from "next/server";





const s3 = new S3Client({
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
  },
  region: process.env.AWS_REGION
});

export async function POST(request) {
  const {fileName, fileType} = await request.json();
  const encodedFileName = encodeURIComponent(fileName)
  const CLOUDFRONT_URL = 'https://d3amjv0mo6dgie.cloudfront.net';
  const KEY = `blogsite2/${encodedFileName}`;
  console.log(`req filename and filetypes are : ${fileName} and ${fileType}` );
  const location = `${CLOUDFRONT_URL}/${KEY}`;
  

  
  const command = new PutObjectCommand({
    Bucket: 'fadestoblogsite',
    Key: KEY,
    ContentType : fileType
  });
  
  try {
    // const response = await s3.send(new ListObjectsCommand({Bucket:'fadestoblogsite'}));


    // console.log('command is ', command);

    const url = await getSignedUrl(s3, command, {expiresIn : 3600});
    // console.log('is this s the presigned url: ', url)
    const responseData = { url, location };
    // const responseData = { url, location };
    return new Response(JSON.stringify(responseData), { headers: { 'Content-Type': 'application/json' } });

    // return new NextResponse(JSON.stringify({url, location}), {headers : {'Content-Type': 'application/json'}})
  } catch (err) {
    console.error('Error fetching image from S3:', err);
    return new Response(JSON.stringify({message : 'Error fetching image from S3'}), {headers : {'Content-Type' : 'application/json'}});
  }
}




// const s3 = new S3Client({
//     credentials: {
//         accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//         secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
//     },
//     region: process.env.AWS_REGION,
//     logger : console
//   });

//   export async function POST ( req){
//     const {fileName, fileType} = await req.json();
//     console.log(`req filename and filetypes are : ${fileName} and ${fileType}` );
//     const CLOUDFRONT_URL = 'https://d3amjv0mo6dgie.cloudfront.net';
//     const KEY = `blog-images/${fileName}`


//     try {
//         const command = new PutObjectCommand ({
//             Bucket : 'fadestoblogsite',
//             Key : KEY,
//             ContentType :fileType,
//         });
//         console.log('PutObjectCommand:', command.input);
//         console.log('Generated Key:', KEY);
//         const url = await getSignedUrl(s3, command, {expiresIn:60})
//         console.log('url is ', url)
//        return new Response(
//         JSON.stringify({
//             url,
//             location : `${CLOUDFRONT_URL}/${KEY}`
//         }),
//         { status : 200, headers : {'Content-Type' : 'application/json'} }
//        )

//     } catch (err) {
//         return new Response(
//             JSON.stringify(
//                 { mesage : 'Failed to generate pre-signed URL', error: err },
//             ),
//             {headers : {'Content-Type' : 'application/json'}}
//         )
//     }
//   }