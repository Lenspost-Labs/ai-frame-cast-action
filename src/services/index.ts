// @ts-ignore
const fidToConnectedAddressMap = new Map<number, string>();
export const storeFidToConnectedAddressMap = (
  fid: number,
  connectedAddress: string
) => {
  fidToConnectedAddressMap.set(fid, connectedAddress);
};
// @ts-ignore
export const getConnectedAddressByFid = (fid: number) => {
  return fidToConnectedAddressMap.get(fid);
};
