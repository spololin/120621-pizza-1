<template>
  <label v-bind="$attrs">
    <RadioButton
      class="visually-hidden"
      :params="selector"
      @clickRadioButton="$emit('clickSelectorItem', $event)"
    />
    <b v-if="selector.type === 'dough'">{{ selector.name }}</b>
    <span>{{
      selector.type === "dough" ? selector.description : selector.name
    }}</span>
  </label>
</template>

<script>
import RadioButton from "@/common/components/RadioButton";

export default {
  name: "BuilderSelectorItem",
  components: { RadioButton },
  props: {
    selector: {
      type: Object,
    },
  },
};
</script>
