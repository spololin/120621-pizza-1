<template>
  <div id="app">
    <AppLayout :total-price="totalPrice" />
    <main class="content">
      <IndexView @price="price" />
    </main>
  </div>
</template>

<script>
import AppLayout from "@/layouts/AppLayout";
import IndexView from "@/views/Index";

export default {
  name: "App",
  data() {
    return {
      totalPrice: 0,
    };
  },
  components: {
    AppLayout,
    IndexView,
  },
  methods: {
    price(total) {
      this.totalPrice = total;
    },
  },
};
</script>

<style lang="scss">
@import "~@/assets/scss/app";
</style>
