<template>
  <div class="ingredients__sauce" v-if="sauces.length">
    <p>Основной соус:</p>

    <label
      class="radio ingredients__input"
      v-for="sauce in sauces"
      :key="sauce.id"
    >
      <input
        type="radio"
        name="sauce"
        :value="sauce.value"
        :checked="sauce.checked"
      />
      <span>{{ sauce.name }}</span>
    </label>
  </div>
</template>

<script>
export default {
  name: "BuilderSauceSelector",
  props: {
    sauces: {
      type: Array,
      default: () => [],
    },
  },
};
</script>
