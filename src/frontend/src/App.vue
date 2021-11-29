<template>
  <div id="app">
    <AppLayout />
    <main class="content">
      <ConstructorPizza />
    </main>
  </div>
</template>

<script>
import AppLayout from "@/layouts/AppLayout";
import ConstructorPizza from "@/views/ConstructorPizza";

export default {
  name: "App",
  components: {
    AppLayout,
    ConstructorPizza,
  },
};
</script>

<style lang="scss">
@import "~@/assets/scss/app";
</style>
