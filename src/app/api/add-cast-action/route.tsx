import { NextResponse, NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
  return new NextResponse(
    `<!DOCTYPE html>
      <html>
        <head>
          <title>AI Frames using Cast Action</title>
          <meta property="og:title" content="Prompt: " />
          <meta name="fc:frame" content="vNext" />
          <meta name="fc:frame:post_url" content="https://app.lenspost.xyz" />
          <meta name="fc:frame:button:1" content="Add cast action"  />
          <meta name="fc:frame:button:1:action" content="post_redirect" />
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
