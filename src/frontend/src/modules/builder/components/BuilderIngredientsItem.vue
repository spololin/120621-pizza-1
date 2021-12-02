<template>
  <li class="ingredients__item">
    <span class="filling" :class="`filling--${filling.value}`">{{
      filling.name
    }}</span>
    <ItemCounter />
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
};
</script>
