export interface ISwapTransactionPayload {
  historical_usd__gte: number;
  limit: number;
  wallet_id?: number;
}
