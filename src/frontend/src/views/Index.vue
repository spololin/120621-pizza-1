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

      <BuilderPizzaContent :pizzaParams="pizzaParams" />
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
      pizzaParams: {
        name: "",
        price: 0,
        validate: false,
        type: "",
      },
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
      switch (filling.typeClick) {
        case "decrease":
          if (
            this.getCountSelectedIngredients() <
            PIZZA_VALUES.MAX_COUNT_INGREDIENTS
          ) {
            this.clickButtonItemCounterAction(filling);
          }
          break;
        case "increase":
          this.clickButtonItemCounterAction(filling);
          break;
      }
    },
    getCountSelectedIngredients: function () {
      return this.pizza.fillings.reduce((acc, item) => {
        return (acc += item.count);
      }, 0);
    },
    clickButtonItemCounterAction: function (filling) {
      this.pizza.fillings = this.pizza.fillings.map((elem) => {
        if (
          elem.id !== filling.id ||
          (filling.typeClick === "increase" && filling.count === 0)
        )
          return elem;

        const newCount =
          filling.typeClick === "decrease" ? ++filling.count : --filling.count;

        return {
          ...elem,
          count: newCount,
          permissions: {
            increase: newCount !== 0,
            decrease:
              this.getCountSelectedIngredients() <
              PIZZA_VALUES.MAX_COUNT_INGREDIENTS,
          },
        };
      });
    },
  },
};
</script>
