<template>
  <div class="">
    <AppLayoutHeader :total-price="totalPrice" />
    <slot />
  </div>
</template>

<script>
import AppLayoutHeader from "@/layouts/AppLayoutHeader";

export default {
  name: "AppLayoutDefault",
  components: {
    AppLayoutHeader,
  },
  props: {
    totalPrice: {
      type: Number,
      required: true,
    },
  },
};
</script>

<style></style>
