import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import heicConvert from 'heic-convert'; // If using `heic-convert`

const s3 = new S3Client({
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
  region: process.env.AWS_REGION,
});

export async function POST(request) {
  const { fileName, fileType } = await request.json();
  const CLOUDFRONT_URL = 'https://d3amjv0mo6dgie.cloudfront.net';
  const KEY = `blogsite2/${fileName}`;
  console.log(`Received file: ${fileName} with file type: ${fileType}`);
  
  // Read the raw file data (not base64 encoded)
  const fileData = await request.blob(); // Assuming a Blob data type from frontend (or raw buffer)

  // Initialize the buffer and fileType (just in case we need conversion)
  let convertedData = fileData;
  let convertedFileType = fileType;

  // Check if the file is HEIC
  if (fileType === 'image/heic') {
    // Convert HEIC to JPG using heic-convert
    const arrayBuffer = await fileData.arrayBuffer(); // Convert blob to array buffer
    const outputBuffer = await heicConvert({
      buffer: Buffer.from(arrayBuffer), // Buffer containing HEIC image data
      format: 'JPEG'                   // Convert to JPEG
    });
    
    // Update fileType and data
    convertedData = Buffer.from(outputBuffer); 
    convertedFileType = 'image/jpeg'; // Convert to JPEG
    
    console.log('File converted to JPEG');
  }

  // Location to store the file on S3
  const location = `${CLOUDFRONT_URL}/${KEY}`;

  const command = new PutObjectCommand({
    Bucket: 'fadestoblogsite',
    Key: KEY,
    ContentType: convertedFileType,
    Body: convertedData // Use either converted or original file data
  });

  try {
    // Generate signed URL for S3 upload
    const url = await getSignedUrl(s3, command, { expiresIn: 3600 });

    return new Response(
      JSON.stringify({ url, location }),
      { headers: { 'Content-Type': 'application/json' } }
    );
  } catch (err) {
    console.error('Error uploading image to S3:', err);
    return new Response(
      JSON.stringify({ message: 'Error uploading image to S3' }),
      { headers: { 'Content-Type': 'application/json' } }
    );
  }
}
