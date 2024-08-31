import type { currencies } from "@/constants";

export type BaseCurrency = (typeof currencies)[number];

export interface ConvertedRates {
  USD: number;
  EUR: number;
  RUB: number;
}
