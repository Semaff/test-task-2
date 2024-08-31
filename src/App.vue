<template>
  <metainfo>
    <template v-slot:title="{ content }">{{
      content ? `${content} | Конвертер` : `Конвертер`
    }}</template>
  </metainfo>
  <my-header @update-base-currency="updateBaseCurrency" />
  <router-view
    :base-currency="baseCurrency"
    :is-loading="isLoading"
    :rates="rates"
    :error="error"
  />
</template>

<script setup lang="ts">
import { ref } from "vue";

import { useCurrencyRates } from "@/composables/useCurrencyRates";

import MyHeader from "./components/MyHeader.vue";

import type { BaseCurrency } from "./types";

const { isLoading, error, rates } = useCurrencyRates();

const baseCurrency = ref<BaseCurrency>("USD");

const updateBaseCurrency = (currency: BaseCurrency) => {
  baseCurrency.value = currency;
};
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
  text-align: center;
}
</style>
