<template>
  <input
    type="radio"
    :name="params.type"
    :value="params.value"
    :checked="params.checked"
    v-bind="$attrs"
    @change="$emit('selected')"
  >
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
