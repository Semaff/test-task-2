<template>
  <div>
    <h1>Конвертация валют</h1>
    <div>
      <select v-model="currencyFrom" @change="convertCurrency">
        <option v-for="currency in currencies" :key="currency" :value="currency">
          {{ currency }}
        </option>
      </select>
      <input type="number" v-model.number="amountFrom" @input="convertCurrency" />

      <select v-model="currencyTo" @change="convertCurrency">
        <option v-for="currency in currencies" :key="currency" :value="currency">
          {{ currency }}
        </option>
      </select>
      <input type="number" v-model.number="amountTo" @input="convertCurrencyInverse" />
    </div>
    <div v-if="error">
      <p>Ошибка загрузки данных: {{ error }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from "vue";

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
    const currencies = ["USD", "EUR", "RUB"];
    const currencyFrom = ref<string>("USD");
    const currencyTo = ref<string>("RUB");
    const amountFrom = ref<number>(0);
    const amountTo = ref<number>(0);

    // Convert currency based on the props
    const convertCurrency = () => {
      if (currencyFrom.value === currencyTo.value) {
        amountTo.value = parseFloat(amountFrom.value.toFixed(2));
        return;
      }

      const rateKey = `${currencyFrom.value.toLowerCase()}-${currencyTo.value.toLowerCase()}`;
      const rate = props.rates[rateKey];

      if (!rate) {
        console.error("Conversion rate not found for:", rateKey);
        amountTo.value = 0;
        return;
      }

      amountTo.value = parseFloat((amountFrom.value * rate).toFixed(2));
    };

    const convertCurrencyInverse = () => {
      if (currencyFrom.value === currencyTo.value) {
        amountFrom.value = parseFloat(amountTo.value.toFixed(2));
        return;
      }

      const rateKey = `${currencyTo.value.toLowerCase()}-${currencyFrom.value.toLowerCase()}`;
      const rate = props.rates[rateKey];

      if (!rate) {
        console.error("Conversion rate not found for:", rateKey);
        amountFrom.value = 0;
        return;
      }

      amountFrom.value = parseFloat((amountTo.value * rate).toFixed(2));
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
      convertCurrencyInverse,
    };
  },
});
</script>
