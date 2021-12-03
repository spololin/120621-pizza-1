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

      <BuilderPizzaContent :price="getTotalPizzaPrice" />
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
  },
  computed: {
    getTotalPizzaPrice() {
      const selectedSize = this.pizza.sizes.find((elem) => {
        return elem.checked === true;
      });

      const selectedSauce = this.pizza.sauces.find((elem) => {
        return elem.checked === true;
      });

      const selectedDough = this.pizza.doughs.find((elem) => {
        return elem.checked === true;
      });

      const selectedFillings = this.pizza.fillings.filter((elem) => {
        return elem.count > 0;
      });

      console.log(selectedFillings);

      const fillingsPrice = selectedFillings.reduce((acc, curr) => {
        const { count, price } = curr;
        return acc + count * price;
      }, 0);

      console.log(selectedDough, selectedSauce, fillingsPrice, selectedSize);
      return (
        (selectedDough.price + selectedSauce.price + fillingsPrice) *
        selectedSize.multiplier
      );
    },
  },
};
</script>
