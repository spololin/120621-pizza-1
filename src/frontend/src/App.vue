<template>
  <div id="app">
    <AppLayout>
      <transition
        name="view"
        appear
        mode="out-in"
        enter-active-class="animate-view"
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

.animate-view {
  animation: transformRotateY;
  animation-duration: .7s;
}

@keyframes transformRotateY {
  0% {
    transform: rotateY(180deg);
  }

  to {
    transform: rotateY(0);
  }
}
</style>
