<template>
  <li class="ingredients__item">
    <AppDrag :transfer-data="filling">
      <span class="filling" :class="`filling--${filling.value}`">{{
        filling.name
      }}</span>
    </AppDrag>
    <ItemCounter
      :count="filling.count"
      :permissions="filling.permissions"
      @clickButtonItemCounter="clickButtonItemCounter"
    />
  </li>
</template>

<script>
import ItemCounter from "@/common/components/ItemCounter";
import AppDrag from "@/common/components/AppDrag";
export default {
  name: "BuilderIngredientsItem",
  props: {
    filling: {
      type: Object,
      required: true,
    },
  },
  components: { AppDrag, ItemCounter },
  methods: {
    clickButtonItemCounter: function (typeClick) {
      this.$emit("clickButtonItemCounter", { ...this.filling, typeClick });
    },
  },
};
</script>
