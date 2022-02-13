<template>
  <input
    :value="value"
    type="text"
    v-bind="$attrs"
    @input="$emit('input', $event.target.value)"
  >
</template>
<script>
export default {
  name: "AppInput",
  props: {
    "value": {
      type: [String, Number],
      default: "",
    },
  },
};
</script>
