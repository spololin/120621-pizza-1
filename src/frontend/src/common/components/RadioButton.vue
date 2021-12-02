<template>
  <input
    type="radio"
    :name="params.type"
    :value="params.value"
    v-bind="$attrs"
    @click="$emit('clickRadioButton', params)"
  />
</template>

<script>
export default {
  name: "RadioButton",
  props: {
    params: {
      type: Object,
      required: true,
      validator: (v) =>
        v.type.length && ["sauce", "dough", "diameter"].includes(v.type),
    },
  },
};
</script>
