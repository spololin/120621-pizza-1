<template>
  <button
    type="button"
    class="button"
    v-bind="$attrs"
  >
    <slot />
  </button>
</template>

<script>
export default {
  name: "Button",
};
</script>
