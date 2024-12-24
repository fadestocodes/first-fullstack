
import { S3Client, PutObjectCommand  } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';


const s3 = new S3Client({

  credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
  },
  region: process.env.AWS_REGION
});

export async function POST(request) {
  const {fileName, fileType} = await request.json();
  const CLOUDFRONT_URL = 'https://d3amjv0mo6dgie.cloudfront.net';
  const KEY = `blogsite2/${fileName}`
  console.log(`req filename and filetypes are : ${fileName} and ${fileType}` );
  const location = `${CLOUDFRONT_URL}/${KEY}`;
  

  
  const command = new PutObjectCommand({
    Bucket: 'fadestoblogsite',
    Key: KEY,
    ContentType : fileType
  });
  
  try {


    const url = await getSignedUrl(s3, command, {expiresIn : 3600});
    // console.log('url is ', url)
    const responseData = { url, location };
    return new Response(JSON.stringify(responseData), { headers: { 'Content-Type': 'application/json' } });

    // return new NextResponse(JSON.stringify({url, location}), {headers : {'Content-Type': 'application/json'}})
  } catch (err) {
    console.error('Error fetching image from S3:', err);
    return new Response(JSON.stringify({message : 'Error fetching image from S3'}), {headers : {'Content-Type' : 'application/json'}});
  }
}

