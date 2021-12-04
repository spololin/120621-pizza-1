<template>
  <form action="#" method="post">
    <div class="content__wrapper">
      <h1 class="title title--big">Конструктор пиццы</h1>

      <BuilderDoughSelector
        :doughs="pizza.doughs"
        @clickSelectorItem="clickSelectorItem"
      />
      <BuilderSizeSelector
        :sizes="pizza.sizes"
        @clickSelectorItem="clickSelectorItem"
      />
      <BuilderIngredientsSelector
        :fillings="pizza.fillings"
        :sauces="pizza.sauces"
        @clickSelectorItem="clickSelectorItem"
        @clickButtonItemCounter="clickButtonItemCounter"
      />

      <BuilderPizzaContent
        :price="totalPizzaPrice"
        :pizzaClass="pizzaClass"
        :fillings="selectedItems.fillings"
        :name="pizza.name"
        @changeNamePizza="changeNamePizza"
      />
    </div>
  </form>
</template>

<script>
import pizzaData from "@/static/pizza.json";
import { getPizzaValues } from "@/common/helpers";
import { PIZZA_VALUES } from "@/common/constants";
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
          filling.typeClick === "decrease" ? ++filling.count : --filling.count;

        return {
          ...elem,
          count,
          permissions: {
            increase: count > 0,
            decrease: count < PIZZA_VALUES.MAX_COUNT_TYPE_INGREDIENT,
          },
        };
      });
    },
    getSelectedPizzaItems(type) {
      return this.pizza[type].find((elem) => {
        return elem.checked === true;
      });
    },
    changeNamePizza(event) {
      this.pizza.name = event.target.value;
    },
  },
  computed: {
    selectedItems() {
      return {
        dough: this.getSelectedPizzaItems("doughs"),
        size: this.getSelectedPizzaItems("sizes"),
        sauce: this.getSelectedPizzaItems("sauces"),
        fillings: this.pizza.fillings.filter((item) => item.count),
      };
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
    pizzaClass() {
      const basePartClass = "pizza--foundation--";
      const doughPartClass =
        this.selectedItems.dough.value === "light" ? "small" : "big";
      const saucePartClass = this.selectedItems.sauce.value;

      return basePartClass + doughPartClass + "-" + saucePartClass;
    },
  },
};
</script>
