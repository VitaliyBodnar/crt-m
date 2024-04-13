import { ISwapTransaction } from './swap-transaction.interface';

export interface ISwapTransactionsGroup {
  token0Id: null;
  token0Name: null;
  token0Symbol: null;
  token1Id: string;
  token1Name: string;
  token1Symbol: string;
  totalValue: number;
  swaps: ISwapTransaction[];
}
