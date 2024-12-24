// app/api/proxy-image/route.js

import { NextResponse } from 'next/server';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get('url'); // Get the "url" query param
    console.log('url is ',url);
    console.log('full url is ', request.url)
  if (!url) {
    return NextResponse.json({ error: 'Missing image URL' }, { status: 400 });
  }

  try {
    const response = await fetch(url);

    if (!response.ok) {
      return NextResponse.json(
        { error: `Error fetching image: ${response.statusText}` },
        { status: response.status }
      );
    }

    const contentType = response.headers.get('Content-Type');

    return new NextResponse(response.body, {
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=86400, s-maxage=86400', // Add caching
      },
    });
  } catch (error) {
    console.error('Error fetching proxy image:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
