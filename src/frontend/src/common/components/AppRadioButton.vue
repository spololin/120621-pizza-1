<template>
  <input
    type="radio"
    :name="params.type"
    :value="params.value"
    :checked="params.checked"
    v-bind="$attrs"
    @click="updateSelectorItem(params)"
  >
</template>

<script>
import { mapMutations } from "vuex";
import { UPDATE_SELECTOR_ITEM } from "@/store/mutation-types";

export default {
  name: "RadioButton",
  props: {
    params: {
      type: Object,
      required: true,
      validator: (v) =>
        v.type.length && ["sauces", "doughs", "sizes"].includes(v.type),
    },
  },
  methods: {
    ...mapMutations("Builder", {
      updateSelectorItem: UPDATE_SELECTOR_ITEM,
    }),
  },
};
</script>
