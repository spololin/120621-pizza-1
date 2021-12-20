<template>
  <li class="ingredients__item">
    <AppDrag
      :transfer-data="filling"
      :allow-drag="filling.count < MAX_COUNT_TYPE_INGREDIENT"
    >
      <span
        class="filling"
        :class="`filling--${filling.value}`"
      >{{
        filling.name
      }}</span>
    </AppDrag>
    <ItemCounter
      :counter="filling"
    />
  </li>
</template>

<script>
import ItemCounter from "@/common/components/AppItemCounter";
import AppDrag from "@/common/components/AppDrag";
import { MAX_COUNT_TYPE_INGREDIENT } from "@/common/constants";

export default {
  name: "BuilderIngredientsItem",
  components: { AppDrag, ItemCounter },
  props: {
    filling: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      MAX_COUNT_TYPE_INGREDIENT,
    };
  },
};
</script>
