import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  return new NextResponse(
    `<!DOCTYPE html>
      <html>
        <head>
          <title>AI Frames</title>
          <meta property="og:title" content="Prompt: " />
          <meta property="og:image" content="${imageUrl}" />
          <meta name="fc:frame" content="vNext" />
          <meta name="fc:frame:post_url" content="https://app.lenspost.xyz" /> 
          <meta name="fc:frame:image" content="${imageUrl}" />
          <meta name="fc:frame:button:1" content="Add cast action"  />
          <meta name="fc:frame:button:1:action" content="post" />
          <meta name="fc:frame:button:1:target" content="${tunnelUrl}/api/aiFrame" />
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
