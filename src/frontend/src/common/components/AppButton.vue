<template>
  <button
    type="button"
    class="button"
    v-bind="$attrs"
    @click="$emit('onClick')"
  >
    <slot />
  </button>
</template>

<script>
export default {
  name: "Button",
};
</script>
