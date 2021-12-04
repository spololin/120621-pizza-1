<template>
  <div class="content__constructor">
    <div class="pizza" :class="pizzaClass">
      <div class="pizza__wrapper">
        <div class="pizza__filling pizza__filling--ananas"></div>
        <div class="pizza__filling pizza__filling--bacon"></div>
        <div class="pizza__filling pizza__filling--cheddar"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "BuilderPizzaView",
  props: {
    pizzaClass: {
      type: String,
      required: true,
    },
  },
};
</script>
