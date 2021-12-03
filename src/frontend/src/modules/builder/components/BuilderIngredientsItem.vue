<template>
  <li class="ingredients__item">
    <span class="filling" :class="`filling--${filling.value}`">{{
      filling.name
    }}</span>
    <ItemCounter
      :count="filling.count"
      :permissions="filling.permissions"
      @clickButtonItemCounter="clickButtonItemCounter"
    />
  </li>
</template>

<script>
import ItemCounter from "@/common/components/ItemCounter";
export default {
  name: "BuilderIngredientsItem",
  props: {
    filling: {
      type: Object,
      required: true,
    },
  },
  components: { ItemCounter },
  methods: {
    clickButtonItemCounter: function (typeClick) {
      this.$emit("clickButtonItemCounter", { ...this.filling, typeClick });
    },
  },
};
</script>
