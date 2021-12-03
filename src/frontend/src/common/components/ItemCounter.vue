<template>
  <div class="counter counter--orange ingredients__counter">
    <button
      type="button"
      class="counter__button counter__button--minus"
      :disabled="!permissions.increase"
      @click="$emit('clickButtonItemCounter', 'increase')"
    >
      <span class="visually-hidden">Меньше</span>
    </button>
    <input type="text" name="counter" class="counter__input" :value="count" />
    <button
      type="button"
      class="counter__button counter__button--plus"
      :disabled="!permissions.decrease"
      @click="$emit('clickButtonItemCounter', 'decrease')"
    >
      <span class="visually-hidden">Больше</span>
    </button>
  </div>
</template>

<script>
export default {
  name: "ItemCounter",
  props: {
    count: {
      type: Number,
      default: 0,
    },
    permissions: {
      type: Object,
      default: () => ({
        increase: false,
        decrease: true,
      }),
    },
  },
};
</script>
