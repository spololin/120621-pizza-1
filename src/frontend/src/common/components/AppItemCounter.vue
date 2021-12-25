<template>
  <div
    class="counter"
    v-bind="$attrs"
  >
    <button
      type="button"
      class="counter__button counter__button--minus"
      :disabled="value <= min"
      @click="clickButton('decrease')"
    >
      <span class="visually-hidden">Меньше</span>
    </button>
    <input
      :value="value"
      type="text"
      name="counter"
      class="counter__input"
      @input="changeValue"
    >
    <button
      type="button"
      class="counter__button counter__button--plus"
      :disabled="max === null ? false : value >= max"
      @click="clickButton('increase')"
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
    clickButton(operation) {
      this.$emit("clickButton", operation);
    },
    changeValue(event) {
      this.$emit("changeValue", event.target.value);
    },
  },
};
</script>
