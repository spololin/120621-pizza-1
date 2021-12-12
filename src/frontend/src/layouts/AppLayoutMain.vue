<template>
  <div>
    <AppLayoutHeader :total-price="totalPrice" :user="user" />
    <slot />
  </div>
</template>

<script>
import AppLayoutHeader from "@/layouts/AppLayoutHeader";

export default {
  name: "AppLayoutMain",
  components: {
    AppLayoutHeader,
  },
  props: {
    totalPrice: {
      type: Number,
      required: true,
    },
    user: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style></style>
