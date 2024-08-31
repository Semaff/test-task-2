<template>
  <div class="container">
    <div class="convert-form">
      <div class="currency-input">
        <select v-model="currencyFrom" @change="() => convertCurrency(false)">
          <option v-for="currency in currencies" :key="currency" :value="currency">
            {{ currency }}
          </option>
        </select>
        <input type="number" v-model.number="amountFrom" @input="() => convertCurrency(false)" />
      </div>

      <div class="currency-input">
        <select v-model="currencyTo" @change="() => convertCurrency(false)">
          <option v-for="currency in currencies" :key="currency" :value="currency">
            {{ currency }}
          </option>
        </select>
        <input type="number" v-model.number="amountTo" @input="() => convertCurrency(true)" />
      </div>
    </div>

    <div class="convert-error" v-if="conversionError">
      <p>{{ conversionError }}</p>
    </div>

    <div v-if="error">
      <p>Ошибка загрузки данных: {{ error }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from "vue";

import { useMeta } from "vue-meta";

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
    useMeta({
      title: "Конвертация валют",
      htmlAttrs: { lang: "ru" },
    });

    const currencyFrom = ref<string>("USD");
    const currencyTo = ref<string>("RUB");
    const amountFrom = ref<number>(0);
    const amountTo = ref<number>(0);
    const conversionError = ref<string | null>(null);

    const convertCurrency = (inverse?: boolean) => {
      conversionError.value = null;

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

        conversionError.value =
          "Не удалось конвертировать значения! Попробуйте использовать другую валюту!";
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
      conversionError,
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

<style scoped>
.convert-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
}

.convert-error {
  margin-top: 12px;
  color: red;
}

.currency-input {
  display: flex;
  align-items: center;
  gap: 12px;
}

.currency-input select {
  padding: 12px 4px;
  border-radius: 8px;
}

.currency-input input {
  padding: 12px;
  border-radius: 8px;
}
</style>
