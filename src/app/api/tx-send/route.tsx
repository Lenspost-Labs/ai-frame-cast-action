import { frames } from '@/app/cast-frames/frames/frames';
import { transaction } from 'frames.js/core';
import { parseGwei } from 'viem';

export const POST = frames(async (ctx) => {
  // eslint-disable-next-line no-console
  console.log('ctx', ctx);
  const state = JSON.parse(ctx?.message?.state ? ctx?.message.state : '{}');
  const address = state.address;
  return transaction({
    params: {
      value: parseGwei('1000000').toString(),
      to: address,
      data: '0x',
      abi: []
    },
    method: 'eth_sendTransaction',
    chainId: 'eip155:10'
  });
});
