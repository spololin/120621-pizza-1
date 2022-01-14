<template>
  <div>
    <AppLayoutHeader />
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
};
</script>

<style></style>
