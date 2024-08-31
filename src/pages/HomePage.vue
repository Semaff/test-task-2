<template>
  <h1>Курсы валют</h1>

  <div v-if="!isLoading && convertedRates">
    <p v-for="(rate, key) in convertedRates" v-bind:key="rate">
      1 {{ baseCurrency }} = {{ rate }} {{ key }}
    </p>
  </div>

  <div v-else-if="isLoading">
    <p>Загрузка данных...</p>
  </div>

  <div v-else>
    <p>Ошибка загрузки данных: {{ error }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";

import { currencies } from "@/constants";

import type { ConvertedRates } from "@/types";

export default defineComponent({
  props: {
    baseCurrency: {
      type: String,
      required: true,
    },
    rates: {
      type: Object as () => { [key: string]: number },
      required: true,
    },
    isLoading: {
      type: Boolean,
      required: true,
    },
    error: {
      type: String,
      required: false,
    },
  },
  setup(props) {
    const convertedRates = computed<ConvertedRates | null>(() => {
      if (!props.rates || props.isLoading) return null;

      return currencies.reduce((acc, currency) => {
        const parsedCurrency = currency.toLowerCase();
        const parsedBaseCurrency = props.baseCurrency.toLowerCase();

        if (parsedCurrency === parsedBaseCurrency) {
          acc[currency] = 1;
          return acc;
        }

        const converted = props.rates[`${parsedBaseCurrency}-${parsedCurrency}`];

        if (!converted) {
          console.error("Unsupported base currency");
          return acc;
        }

        acc[currency] = converted;
        return acc;
      }, {} as ConvertedRates);
    });

    return { convertedRates };
  },
});
</script>
