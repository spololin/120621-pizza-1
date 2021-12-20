<template>
  <div class="counter counter--orange ingredients__counter">
    <button
      type="button"
      class="counter__button counter__button--minus"
      :disabled="!counter.permissions.decrease"
      @click="clickButtonItemCounter({...counter, operation: 'decrease'})"
    >
      <span class="visually-hidden">Меньше</span>
    </button>
    <input
      type="text"
      name="counter"
      class="counter__input"
      :value="counter.count"
    >
    <button
      type="button"
      class="counter__button counter__button--plus"
      :disabled="!counter.permissions.increase"
      @click="clickButtonItemCounter({...counter, operation: 'increase'})"
    >
      <span class="visually-hidden">Больше</span>
    </button>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "ItemCounter",
  props: {
    counter: {
      type: Object,
      required: true,
    },
  },
  methods: {
    ...mapActions(["clickButtonItemCounter"]),
  },
};
</script>
