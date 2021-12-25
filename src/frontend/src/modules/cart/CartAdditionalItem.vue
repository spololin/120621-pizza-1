<template>
  <li class="additional-list__item sheet">
    <p class="additional-list__description">
      <img
        :src="misc.image"
        width="39"
        height="60"
        :alt="misc.name"
      >
      <span> {{ misc.name }}</span>
    </p>

    <div class="additional-list__wrapper">
      <ItemCounter
        :value="misc.count"
        class="additional-list__counter"
        @clickButton="clickButton"
      />
      <div class="additional-list__price">
        <b>× {{ misc.price }} ₽</b>
      </div>
    </div>
  </li>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "CartAdditionalItem",
  props: {
    "misc": {
      type: Object,
      required: true,
    },
  },
  methods: {
    ...mapActions("Cart", ["changeCountMisc"]),
    clickButton(operation) {
      this.changeCountMisc({ ...this.misc, operation });
    },
  },
};
</script>
