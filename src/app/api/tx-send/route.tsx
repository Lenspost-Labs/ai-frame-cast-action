import {
  calculateTransactionFeeForMints,
  storeFidToConnectedAddressMap
} from '@/services';
import { frames } from '@/app/cast-frames/frames/frames';
import { transaction } from 'frames.js/core';

export const POST = frames(async (ctx) => {
  const state = (ctx.state as any) ?? {};
  const address = state.custodialAddress;
  storeFidToConnectedAddressMap(
    ctx.message?.requesterFid as number,
    ctx.message?.connectedAddress as string
  );
  const fee = await calculateTransactionFeeForMints({
    publicAddress: state.custodialAddress,
    account: state.connectedAddress,
    mints: state.allowedMints,
    balance: state.balance,
    chainId: 84532
  });
  return transaction({
    params: {
      to: address,
      value: fee,
      data: '0x',
      abi: []
    },
    method: 'eth_sendTransaction',
    chainId: 'eip155:84532'
  });
});
