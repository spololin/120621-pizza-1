<template>
  <div class="ingredients__filling" v-if="fillings.length">
    <p>Начинка:</p>

    <ul class="ingredients__list">
      <li
        class="ingredients__item"
        v-for="filling in fillings"
        :key="filling.id"
      >
        <span class="filling" :class="`filling--${filling.value}`">{{
          filling.name
        }}</span>

        <div class="counter counter--orange ingredients__counter">
          <button
            type="button"
            class="counter__button counter__button--minus"
            disabled
          >
            <span class="visually-hidden">Меньше</span>
          </button>
          <input type="text" name="counter" class="counter__input" value="0" />
          <button type="button" class="counter__button counter__button--plus">
            <span class="visually-hidden">Больше</span>
          </button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "BuilderIngredientsSelector",
  props: {
    fillings: {
      type: Array,
      default: () => [],
    },
  },
};
</script>
