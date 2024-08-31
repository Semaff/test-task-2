<template>
  <h1>Конвертация валют</h1>

  <div>
    <select v-model="currencyFrom" @change="() => convertCurrency(false)">
      <option v-for="currency in currencies" :key="currency" :value="currency">
        {{ currency }}
      </option>
    </select>
    <input type="number" v-model.number="amountFrom" @input="() => convertCurrency(false)" />

    <select v-model="currencyTo" @change="() => convertCurrency(false)">
      <option v-for="currency in currencies" :key="currency" :value="currency">
        {{ currency }}
      </option>
    </select>
    <input type="number" v-model.number="amountTo" @input="() => convertCurrency(true)" />
  </div>

  <div v-if="error">
    <p>Ошибка загрузки данных: {{ error }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from "vue";

import { currencies } from "@/constants";

export default defineComponent({
  props: {
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
    const currencyFrom = ref<string>("USD");
    const currencyTo = ref<string>("RUB");
    const amountFrom = ref<number>(0);
    const amountTo = ref<number>(0);

    const convertCurrency = (inverse?: boolean) => {
      const parsedCurrencyFrom = currencyFrom.value.toLowerCase();
      const parsedCurrencyTo = currencyTo.value.toLowerCase();

      const from = !inverse ? amountFrom : amountTo;
      const to = !inverse ? amountTo : amountFrom;

      if (parsedCurrencyFrom === parsedCurrencyTo) {
        to.value = from.value;
        return;
      }

      const rate = props.rates[`${parsedCurrencyFrom}-${parsedCurrencyTo}`];

      if (!rate) {
        console.error("Conversion rate not found for:", parsedCurrencyFrom, parsedCurrencyTo);
        to.value = 0;
        return;
      }

      to.value = parseFloat((from.value * rate).toFixed(2));
    };

    watch(
      () => props.rates,
      () => {
        convertCurrency(); // Recalculate when rates change
      },
    );

    return {
      currencies,
      currencyFrom,
      currencyTo,
      amountFrom,
      amountTo,
      convertCurrency,
    };
  },
});
</script>
