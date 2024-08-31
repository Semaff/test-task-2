import type { currencies } from "@/constants";

export type BaseCurrency = (typeof currencies)[number];

export type ConvertedRates = Record<BaseCurrency, number>;
