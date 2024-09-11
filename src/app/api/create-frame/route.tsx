import { NextResponse, NextRequest } from 'next/server';
import { BACKEND_ENDPOINT } from '@/data';
interface Body {
  gatedCollections: string;
  contractAddress: string;
  gatedChannels: string;
  allowedMints: number;
  redirectLink: string;
  evm_address: string;
  isRecast: boolean;
  isFollow: boolean;
  isTopUp: boolean;
  canvasId: number;
  isLike: boolean;
  chainId: number;
  fid: string;
}

export async function POST(req: NextRequest) {
  try {
    const url = `${BACKEND_ENDPOINT}/util/create-frame`;
    const body: Body = await req.json();
    if (!body) {
      return NextResponse.json({ error: 'Invalid body' }, { status: 400 });
    }
    // Make a POST request to the endpoint
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body),
      method: 'POST'
    });

    // Check if the response is ok (status in the range 200-299)
    if (!response.ok) {
      return NextResponse.json(
        { error: 'Failed to create frame' },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error: any) {
    console.error('Error occurred:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
