<template>
  <div class="content__constructor">
    <div class="pizza" :class="pizzaClass">
      <div class="pizza__wrapper">
        <div
          class="pizza__filling"
          v-for="filling in fillings"
          :key="filling.id"
          :class="classFilling(filling)"
        ></div>
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
    fillings: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    classFilling(filling) {
      let customClass = {};
      customClass[`pizza__filling--${filling.value}`] = true;
      switch (filling.count) {
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
