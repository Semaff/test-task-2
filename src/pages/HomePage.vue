<template>
  <div class="container">
    <ul class="rate-list" v-if="!isLoading && convertedRates">
      <li class="rate-list__item" v-for="(rate, key) in convertedRates" v-bind:key="rate">
        1 {{ baseCurrency }} = {{ rate }} {{ key }}
      </li>
    </ul>

    <div v-else-if="isLoading">
      <p>Загрузка данных...</p>
    </div>

    <div v-else>
      <p>Ошибка загрузки данных: {{ error }}</p>
    </div>
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

        acc[currency] = +converted.toFixed(2);
        return acc;
      }, {} as ConvertedRates);
    });

    return { convertedRates };
  },
});
</script>

<style scoped>
.rate-list {
  padding: 32px 0;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;

  border: 1px solid #000;
}

.rate-list__item {
  font-size: 17px;
  font-weight: 600;
  list-style: none;
  border-bottom: 1px solid #000;
  padding: 12px 0;
}
</style>
