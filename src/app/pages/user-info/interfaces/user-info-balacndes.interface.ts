export interface IUserInfoBalances {
  id: number;
  snapshotDate: string;
  wallet: number;
  totalUsd: number;
  chainBalances: {
    chain: string;
    tokenBalances: IUserInfoTokenBalance[];
  }[];
}

export interface IUserInfoTokenBalance {
  token: {
    id: number;
    externalId: string;
    name: string;
    symbol: string;
    address: string;
    service: string;
  };
  unitValue: number;
  price: number;
  usd: number;
}
