<template>
  <header class="header">
    <h1 class="header__logo">Конвертация</h1>

    <nav class="nav">
      <router-link to="/">Главная</router-link>
      <router-link to="/convert">Конвертация</router-link>
    </nav>

    <select class="base-select" v-model="baseCurrency" @change="changeBaseCurrency">
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

<style scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 24px;

  margin: 0 24px;
  padding: 24px;
  border-bottom: 2px solid #e1e1e1;
}

.header__logo {
  font-size: 34px;
  font-style: italic;
}

.nav {
  display: flex;
  align-items: center;
  gap: 12px;
}

.nav a {
  color: #000;
  font-size: 18px;
}

.nav a:hover {
  text-decoration: none;
}

.base-select {
  padding: 12px 4px;
  border: 1px solid #000;
  border-radius: 12px;
}
</style>
