<template>
  <div class="content__dough">
    <div class="sheet">
      <h2 class="title title--small sheet__title">Выберите тесто</h2>

      <div class="sheet__content dough" v-if="doughs.length">
        <label
          class="dough__input"
          v-for="dough in doughs"
          :key="dough.id"
          :class="`dough__input--${dough.value}`"
        >
          <input
            type="radio"
            name="dough"
            :value="dough.value"
            class="visually-hidden"
            :checked="dough.checked"
          />
          <b>{{ dough.name }}</b>
          <span>{{ dough.description }}</span>
        </label>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "BuilderDoughSelector",
  props: {
    doughs: {
      type: Array,
      default: () => [],
    },
  },
};
</script>
