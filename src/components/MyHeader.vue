<template>
  <header>
    <nav>
      <router-link to="/">Главная</router-link>
      <router-link to="/convert">Конвертация</router-link>
    </nav>
    <select v-model="baseCurrency" @change="changeBaseCurrency">
      <option v-for="currency in currencies" v-bind:key="currency" :value="currency">
        {{ currency }}
      </option>
    </select>
  </header>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import { currencies } from "@/constants";

import type { BaseCurrency } from "@/types";

export default defineComponent({
  props: {
    defaultCurrency: {
      type: String,
      default: "USD",
    },
  },
  methods: {
    changeBaseCurrency() {
      this.$emit("update-base-currency", this.baseCurrency);
    },
  },
  data() {
    return {
      currencies,
      baseCurrency: "USD" as BaseCurrency,
    };
  },
});
</script>
