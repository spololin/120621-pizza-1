<template>
  <component
    :is="layout"
    :total-price="totalPrice"
    :user="user"
  >
    <slot />
  </component>
</template>

<script>
const defaultLayout = "AppLayoutDefault";

export default {
  name: "AppLayout",
  props: {
    totalPrice: {
      type: Number,
      default: 0,
    },
    user: {
      type: Object,
      required: true,
    },
  },
  computed: {
    layout() {
      const layout = this.$route.meta.layout || defaultLayout;
      return () => import(`@/layouts/${layout}.vue`);
    },
  },
};
</script>
;
