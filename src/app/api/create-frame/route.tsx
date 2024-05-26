import { NextResponse, NextRequest } from 'next/server';
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
    const url = 'https://dev.poster.fun/util/create-frame';
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
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json(error);
  }
}
