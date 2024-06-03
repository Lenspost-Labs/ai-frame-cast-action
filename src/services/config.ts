import { publicActionsL2 } from 'viem/op-stack';
import { createPublicClient, http } from 'viem';
import * as chains from 'viem/chains';

export const publicClient = createPublicClient({
  chain: chains.base,
  transport: http(),
  key: 'public'
}).extend(publicActionsL2());

export function getChain(chainId: number) {
  for (const chain of Object.values(chains)) {
    if (chain.id === chainId) {
      return chain;
    }
  }

  throw new Error(`Chain with id ${chainId} not found`);
}
