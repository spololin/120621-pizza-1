<template>
  <div id="app">
    <AppLayout />
    <main class="content">
      <IndexView />
    </main>
  </div>
</template>

<script>
import AppLayout from "@/layouts/AppLayout";
import IndexView from "@/views/Index";

export default {
  name: "App",
  components: {
    AppLayout,
    IndexView,
  },
};
</script>

<style lang="scss">
@import "~@/assets/scss/app";
</style>
