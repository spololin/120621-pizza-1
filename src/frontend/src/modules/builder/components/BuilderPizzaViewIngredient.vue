<template>
  <div>
    <transition-group
      name="filling"
      appear
    >
      <div
        v-for="iter in filling.count"
        :key="iter"
        class="pizza__filling"
        :class="classFilling(iter)"
      />
    </transition-group>
  </div>
</template>

<script>
export default {
  name: "BuilderPizzaViewIngredient",
  props: {
    filling: {
      type: Object,
      required: true,
    },
  },
  methods: {
    classFilling(iter) {
      let customClass = {};
      customClass[`pizza__filling--${this.filling.value}`] = true;
      switch (iter) {
        case 2:
          customClass["pizza__filling--second"] = true;
          break;
        case 3:
          customClass["pizza__filling--third"] = true;
          break;
        default:
          break;
      }

      return customClass;
    },
  },
};
</script>

<style scoped>
.filling-enter-active,
.filling-leave-active {
  transition: all .5s ease;
}
.filling-enter,
.filling-leave-to {
  transform: scale(1.1);
  opacity: 0;
}
</style>
