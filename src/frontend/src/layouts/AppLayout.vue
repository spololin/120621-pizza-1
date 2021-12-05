<template>
  <AppLayoutHeader :total-price="totalPrice" />
</template>

<script>
import AppLayoutHeader from "@/layouts/AppLayoutHeader";

export default {
  name: "AppLayout",
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
