<template>
  <input
    type="radio"
    :name="params.type"
    :value="params.value"
    :checked="params.checked"
    v-bind="$attrs"
    @click="clickSelectorItem(params)"
  >
</template>

<script>
import { mapActions } from "vuex";

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
    ...mapActions("Builder", ["clickSelectorItem"]),
  },
};
</script>
