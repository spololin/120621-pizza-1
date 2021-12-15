<template>
  <div id="app">
    <AppLayout :total-price="totalPizzaPrice" :user="user">
      <router-view
        :pizza="pizza"
        :selected-items="selectedItems"
        :selected-fillings="selectedFillings"
        :total-price="totalPizzaPrice"
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
  data() {
    return {
      pizza: getPizzaValues(pizzaData),
      user: {
        authorization: false,
        name: "Василий ложкин",
      },
    };
  },
  components: {
    AppLayout,
  },
  computed: {
    selectedItems() {
      return {
        dough: this.selectedDough,
        size: this.selectedSize,
        sauce: this.selectedSauce,
        fillings: this.selectedFillings,
      };
    },
    selectedDough() {
      return this.pizza.doughs.find(({ checked }) => checked);
    },
    selectedSize() {
      return this.pizza.sizes.find(({ checked }) => checked);
    },
    selectedSauce() {
      return this.pizza.sauces.find(({ checked }) => checked);
    },
    selectedFillings() {
      return this.pizza.fillings.filter(({ count }) => count);
    },
    totalPizzaPrice() {
      const fillingsPrice = this.selectedItems.fillings.reduce((acc, elem) => {
        const { count, price } = elem;
        return acc + count * price;
      }, 0);

      return (
        (this.selectedItems.dough.price +
          this.selectedItems.sauce.price +
          fillingsPrice) *
        this.selectedItems.size.multiplier
      );
    },
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
