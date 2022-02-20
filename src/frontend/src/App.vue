<template>
  <div id="app">
    <AppLayout>
      <transition
        name="view"
        appear
        mode="out-in"
      >
        <router-view />
      </transition>
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
  created() {
    this.$store.dispatch("init");
  },
};
</script>

<style lang="scss">
@import "~@/assets/scss/app";

.view-leave-active,
.view-enter-active {
  transition: 1s;
}
.view-enter {
  transform: translate(-100%, 0);
}
.view-leave-to {
  transform: translate(100%, 0);
}

</style>
