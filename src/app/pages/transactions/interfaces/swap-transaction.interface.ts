export interface ISwapTransaction {
  token0Id: string;
  token0Name: string;
  token0Symbol: string;
  token1Id: string;
  token1Name: string;
  token1Symbol: string;
  sender: {
    address: string;
    isUserAddress: false;
  };
  receiver: {
    address: string;
    isUserAddress: false;
  };
  blockTimestamp: string;
  unitValue0: number;
  unitValue1: number;
  historicalUSD: number;
}
