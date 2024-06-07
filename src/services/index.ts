import { formatEther, parseEther } from 'viem';
import { BACKEND_ENDPOINT } from '@/data';

import { publicClient, getChain } from './config';

const fidToConnectedAddressMap = new Map<number, string>();

export const storeFidToConnectedAddressMap = (
  fid: number,
  connectedAddress: string
) => {
  fidToConnectedAddressMap.set(fid, connectedAddress);
};

export const getConnectedAddressByFid = (fid: number) => {
  return fidToConnectedAddressMap.get(fid);
};
export interface CreateFrameBody {
  metadata: {
    name: string;
  };
  gatedCollections: string;
  gatedChannels: string;
  redirectLink: string;
  allowedMints: number;
  evm_address: string;
  isRecast: boolean;
  isFollow: boolean;
  imageUri: string;
  isTopUp: boolean;
  isLike: boolean;
  chainId: number;
  fid: number;
}

export const createFrameApi = async (createFrameBody: CreateFrameBody) => {
  try {
    const response = await fetch(`${BACKEND_ENDPOINT}/util/create-frame`, {
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(createFrameBody),
      method: 'POST'
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

export const getPublicAddressAndBalance = async (
  fid: number,
  chainId = 8453
) => {
  try {
    const response = await fetch(
      `${BACKEND_ENDPOINT}/mint/by-fid?fid=${fid}&chainId=${chainId}`,
      {
        method: 'GET'
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const { publicAddress, balance } = await response.json();
    return {
      publicAddress,
      balance
    };
  } catch (error) {
    throw error;
  }
};

export const calculateTransactionFeeForMints = async ({
  chainId = 8453,
  publicAddress,
  account,
  balance,
  mints
}: {
  publicAddress: `0x${string}`;
  account: `0x${string}`;
  chainId?: number;
  balance: string;
  mints: number;
}) => {
  try {
    const transactionFee = await publicClient.estimateTotalFee({
      chain: getChain(chainId),
      value: parseEther('1'),
      to: publicAddress,
      account: account
    });

    const transactionFeeForMint = Number(formatEther(transactionFee)) * mints;
    const transactionFeeForDeployment = Number(formatEther(transactionFee));
    const totalTransactionFee =
      transactionFeeForMint + transactionFeeForDeployment;

    const balanceInEther = Number(balance);
    const totalTransactionFeeInEther = totalTransactionFee;
    const remainingBalance = totalTransactionFeeInEther - balanceInEther;
    return String(remainingBalance);
  } catch (error) {
    throw error;
  }
};
