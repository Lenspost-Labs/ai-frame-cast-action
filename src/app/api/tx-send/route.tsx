import {
  calculateTransactionFeeForMints,
  storeFidToConnectedAddressMap
} from '@/services';
import { frames } from '@/app/cast-frames/frames/frames';
import { transaction } from 'frames.js/core';
import { framesConfig } from '@/data/config';
import { parseEther } from 'viem';
import { MIN_FEE } from '@/data';

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
    chainId: framesConfig.chainId,
    mints: state.allowedMints,
    balance: state.balance
  });
  let value;
  try {
    value = parseEther(fee).toString();
  } catch (error) {
    value = parseEther(MIN_FEE).toString();
  }

  return transaction({
    params: {
      value: value,
      to: address,
      data: '0x',
      abi: []
    },
    chainId: `eip155:${framesConfig.chainId}`,
    method: 'eth_sendTransaction'
  });
});
