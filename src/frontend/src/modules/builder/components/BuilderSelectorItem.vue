<template>
  <label v-bind="$attrs">
    <RadioButton :params="selector" />
    <b v-if="selector.type === 'dough'">{{ selector.name }}</b>
    <span>{{
      selector.type === "dough" ? selector.description : selector.name
    }}</span>
  </label>
</template>

<script>
import RadioButton from "@/common/components/RadioButton";

export default {
  name: "SelectorItem",
  components: { RadioButton },
  props: {
    selector: {
      type: Object,
    },
  },
};
</script>
