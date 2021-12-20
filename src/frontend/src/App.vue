<template>
  <div id="app">
    <AppLayout
      :user="user"
    >
      <router-view />
    </AppLayout>
  </div>
</template>

<script>
import AppLayout from "@/layouts/AppLayout";

export default {
  name: "App",
  components: {
    AppLayout,
  },
  data() {
    return {
      user: {
        authorization: false,
        name: "Василий ложкин",
      },
    };
  },
  created() {
    this.$store.dispatch('init');
  },
};
</script>

<style lang="scss">
@import "~@/assets/scss/app";
</style>
