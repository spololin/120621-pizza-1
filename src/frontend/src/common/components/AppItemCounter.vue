<template>
  <div
    class="counter"
    v-bind="$attrs"
  >
    <button
      type="button"
      class="counter__button counter__button--minus"
      :disabled="value <= min"
      @click="change('decrease')"
    >
      <span class="visually-hidden">Меньше</span>
    </button>
    <input
      :value="value"
      type="text"
      name="counter"
      class="counter__input"
      disabled="disabled"
    >
    <button
      type="button"
      class="counter__button counter__button--plus"
      :disabled="max === null ? false : value >= max"
      @click="change('increase')"
    >
      <span class="visually-hidden">Больше</span>
    </button>
  </div>
</template>

<script>
export default {
  name: "ItemCounter",
  props: {
    value: {
      type: Number,
      default: 0,
    },
    max: {
      type: Number,
      default: null,
    },
    min: {
      type: Number,
      default: 0,
    },
  },
  methods: {
    change(operation) {
      this.$emit("change", operation);
    },
  },
};
</script>
