<template>
  <input
    type="radio"
    :name="params.type"
    :value="params.value"
    :checked="params.checked"
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
        v.type.length && ["sauces", "doughs", "sizes"].includes(v.type),
    },
  },
};
</script>
