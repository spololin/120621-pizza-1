<template>
  <div>
    <AppLayoutHeader :total-price="totalPrice" :user="user" />
    <AppLayoutSidebar />
    <slot />
  </div>
</template>

<script>
import AppLayoutHeader from "@/layouts/AppLayoutHeader";
import AppLayoutSidebar from "@/layouts/AppLayoutSidebar";

export default {
  name: "AppLayoutOrdersProfile",
  components: {
    AppLayoutSidebar,
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
