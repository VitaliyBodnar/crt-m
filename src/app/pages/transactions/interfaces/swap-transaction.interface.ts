export interface ISwapTransaction {
  sender: ISwapAddress;
  receiver: ISwapAddress;
  sourceToken: ISwapToken;
  destinationToken: ISwapToken;
  externalId: string;
  sourceUnitValue: number;
  destinationUnitValue: number;
  historicalUsd: number;
  blockHash: string;
  blockNumber: number;
  blockTimestamp: string;
  chain: string;
}

interface ISwapToken {
  id: number;
  externalId: string;
  name: string;
  symbol: string;
  address: string;
  service: string;
}

interface ISwapAddress {
  id: number;
  address: string;
  chain: string;
  label: string;
  isUserAddress: boolean;
  contract: boolean;
}
