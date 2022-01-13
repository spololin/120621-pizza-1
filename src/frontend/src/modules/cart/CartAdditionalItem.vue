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
import { mapMutations } from "vuex";
import { CHANGE_COUNT_MISC } from "@/store/mutation-types";

export default {
  name: "CartAdditionalItem",
  props: {
    "misc": {
      type: Object,
      required: true,
    },
  },
  methods: {
    ...mapMutations("Cart", {
      changeCountMisc: CHANGE_COUNT_MISC,
    }),
    clickButton(operation) {
      this.changeCountMisc({ ...this.misc, operation });
    },
  },
};
</script>
