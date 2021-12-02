<template>
  <input
    type="radio"
    :name="params.type"
    :value="params.value"
    :checked="params.checked"
    class="visually-hidden"
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
