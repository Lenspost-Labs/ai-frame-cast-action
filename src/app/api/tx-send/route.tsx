import { storeFidToConnectedAddressMap } from '@/app/cast-frames/frame/[id]/route';
import { frames } from '@/app/cast-frames/frames/frames';
import { transaction } from 'frames.js/core';
import { parseGwei } from 'viem';

export const POST = frames(async (ctx) => {
  // Ensure state and its properties are properly defined
  const state = (ctx.state as any) ?? {};
  const address = state.custodialAddress;

  storeFidToConnectedAddressMap(ctx.message?.requesterFid as number, ctx.message?.connectedAddress as string);

  return transaction({
    params: {
      value: parseGwei('1000000').toString(),
      to: address,
      data: '0x',
      abi: []
    },
    method: 'eth_sendTransaction',
    chainId: 'eip155:84532'
  });
});
