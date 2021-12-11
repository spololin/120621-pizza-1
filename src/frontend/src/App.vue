<template>
  <div id="app">
    <AppLayout :total-price="totalPrice">
      <router-view />
    </AppLayout>
  </div>
</template>

<script>
import AppLayout from "@/layouts/AppLayout";

export default {
  name: "App",
  data() {
    return {
      totalPrice: 0,
    };
  },
  methods: {
    price(total) {
      this.totalPrice = total;
    },
  },
  components: {
    AppLayout,
  },
};
</script>

<style lang="scss">
@import "~@/assets/scss/app";
</style>
