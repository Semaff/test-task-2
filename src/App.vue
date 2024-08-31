<template>
  <my-header @update-base-currency="updateBaseCurrency" />
  <router-view
    :base-currency="baseCurrency"
    :is-loading="isLoading"
    :rates="rates"
    :error="error"
  />
</template>

<script lang="ts">
import { defineComponent } from "vue";

import { useCurrencyRates } from "@/composables/useCurrencyRates";

import MyHeader from "./components/MyHeader.vue";

import type { BaseCurrency } from "./types";

export default defineComponent({
  components: { MyHeader },
  methods: {
    updateBaseCurrency(currency: BaseCurrency) {
      this.baseCurrency = currency;
    },
  },
  data() {
    return {
      baseCurrency: "USD" as BaseCurrency,
    };
  },
  setup() {
    const { isLoading, error, rates } = useCurrencyRates();

    return {
      isLoading,
      error,
      rates,
    };
  },
});
</script>

<style>
*,
*::after,
*::before {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  scroll-behavior: smooth;
}

.container {
  width: 100%;
  max-width: 540px;
  margin: 48px auto;
  padding: 0 32px;
  text-align: left;
}
</style>
