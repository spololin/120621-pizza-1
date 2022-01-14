<template>
  <div>
    <AppLayoutHeader
      :user="user"
    />
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
    user: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style></style>
