<template>
  <form action="#" method="post">
    <div class="content__wrapper">
      <h1 class="title title--big">Конструктор пиццы</h1>

      <BuilderDoughSelector
        :doughs="pizza.doughs"
        @selectDough="clickSelectorItem"
      />
      <BuilderSizeSelector
        :sizes="pizza.sizes"
        @selectSize="clickSelectorItem"
      />
      <BuilderIngredientsSelector
        :fillings="pizza.fillings"
        :sauces="pizza.sauces"
        @selectSauce="clickSelectorItem"
        @clickButtonItemCounter="clickButtonItemCounter"
      />

      <BuilderPizzaContent
        :price="totalPizzaPrice"
        :selected-items="selectedItems"
        :fillings="selectedFillings"
        :name="pizza.name"
        @changeNamePizza="changeNamePizza"
        @dropFilling="dropFilling"
      />
    </div>
  </form>
</template>

<script>
import pizzaData from "@/static/pizza.json";
import { getPizzaValues } from "@/common/helpers";
import { MAX_COUNT_TYPE_INGREDIENT } from "@/common/constants";
import BuilderDoughSelector from "@/modules/builder/components/BuilderDoughSelector";
import BuilderSizeSelector from "@/modules/builder/components/BuilderSizeSelector";
import BuilderIngredientsSelector from "@/modules/builder/components/BuilderIngredientsSelector";
import BuilderPizzaContent from "@/modules/builder/components/BuilderPizzaContent";

export default {
  name: "IndexView",
  components: {
    BuilderPizzaContent,
    BuilderIngredientsSelector,
    BuilderSizeSelector,
    BuilderDoughSelector,
  },
  data() {
    return {
      pizza: getPizzaValues(pizzaData),
    };
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
    changeNamePizza(event) {
      this.pizza.name = event.target.value;
    },
    dropFilling(filling) {
      this.clickButtonItemCounter({ ...filling, typeClick: "increase" });
    },
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
      return this.pizza.doughs.find((elem) => {
        return elem.checked === true;
      });
    },
    selectedSize() {
      return this.pizza.sizes.find((elem) => {
        return elem.checked === true;
      });
    },
    selectedSauce() {
      return this.pizza.sauces.find((elem) => {
        return elem.checked === true;
      });
    },
    selectedFillings() {
      return this.pizza.fillings.filter((item) => item.count);
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
  watch: {
    totalPizzaPrice: {
      immediate: true,
      handler(totalPrice) {
        this.$emit("price", totalPrice);
      },
    },
  },
};
</script>
