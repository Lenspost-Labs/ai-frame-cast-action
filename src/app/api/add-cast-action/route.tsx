import { NextResponse, NextRequest } from 'next/server';
import { tunnelUrl } from '@/data/constant';

export async function POST(req: NextRequest) {
  return new NextResponse(
    `<!DOCTYPE html>
      <html>
        <head>
          <title>POSTER AI frames</title>
          <meta property="og:title" content="AI frames using POSTER" />
          <meta property="og:image" content="<div>Poster Cast Action</div>" />
          <meta name="fc:frame" content="vNext" />
          <meta name="fc:frame:post_url" content="https://app.lenspost.xyz" /> 
          <meta name="fc:frame:image" content="<div>Poster Cast Action </div>" />
          <meta name="fc:frame:button:1" content="Reload" />
          <meta name="fc:frame:button:1:action" content="post_redirect" />
          <meta name="fc:frame:button:1:target" content="${tunnelUrl}/cast-frames/frames/actions/frame-test" />
        </head>
        <body/>
      </html>`,
    {
      headers: {
        'Content-Type': 'text/html'
      },
      status: 200
    }
  );
}

export const GET = POST;
