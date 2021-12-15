<template>
  <label v-bind="$attrs">
    <RadioButton
      class="visually-hidden"
      :params="selector"
      @clickRadioButton="$emit('clickSelectorItem', $event)"
    />
    <b v-if="selector.type === 'doughs'">{{ selector.name }}</b>
    <span>{{
      selector.type === "doughs" ? selector.description : selector.name
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
      required: true,
    },
  },
};
</script>
