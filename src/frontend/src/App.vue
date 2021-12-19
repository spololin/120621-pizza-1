<template>
  <div id="app">
    <AppLayout
      :user="user"
    >
      <router-view
        @inputName="pizza.name = $event.target.value"
        @dropFilling="dropFilling"
        @clickButtonItemCounter="clickButtonItemCounter"
        @clickSelectorItem="clickSelectorItem"
      />
    </AppLayout>
  </div>
</template>

<script>
import AppLayout from "@/layouts/AppLayout";
import pizzaData from "@/static/pizza.json";
import { getPizzaValues } from "@/common/helpers";
import { MAX_COUNT_TYPE_INGREDIENT } from "@/common/constants";

export default {
  name: "App",
  components: {
    AppLayout,
  },
  data() {
    return {
      pizza: getPizzaValues(pizzaData),
      user: {
        authorization: false,
        name: "Василий ложкин",
      },
    };
  },
  created() {
    this.$store.dispatch('init');
  },
  methods: {
    clickSelectorItem: function (selector) {
      this.pizza[selector.type] = this.pizza[selector.type].map((elem) => ({
        ...elem,
        checked: selector.id === elem.id,
      }));
    },
    clickButtonItemCounter: function (filling) {
      this.pizza.fillings = this.pizza.fillings.map((elem) => {
        if (elem.id !== filling.id) return elem;

        const count =
          filling.typeClick === "increase" ? ++filling.count : --filling.count;

        return {
          ...elem,
          count,
          permissions: {
            decrease: count > 0,
            increase: count < MAX_COUNT_TYPE_INGREDIENT,
          },
        };
      });
    },
    dropFilling(filling) {
      this.clickButtonItemCounter({ ...filling, typeClick: "increase" });
    },
  },
};
</script>

<style lang="scss">
@import "~@/assets/scss/app";
</style>
