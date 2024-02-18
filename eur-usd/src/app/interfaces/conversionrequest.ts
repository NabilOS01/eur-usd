export interface Conversionrequest {
  amount: number;
  convertedValue: number;
  baseCurrency: string;
  targetCurrency: string;
  exchangeRate: number;
  fixedRate: number | null;
}
