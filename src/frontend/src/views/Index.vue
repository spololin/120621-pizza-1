<template>
  <form action="#" method="post">
    <div class="content__wrapper">
      <h1 class="title title--big">Конструктор пиццы</h1>

      <BuilderDoughSelector
        :doughs="pizza.doughs"
        @clickDoughSelector="pizzaSelectors.dough = $event"
      />
      <BuilderSizeSelector
        :sizes="pizza.sizes"
        @clickSizeSelector="pizzaSelectors.size = $event"
      />
      <BuilderIngredientsSelector
        :fillings="pizza.fillings"
        :sauces="pizza.sauces"
        @clickSauceSelector="pizzaSelectors.sauce = $event"
      />

      <BuilderPizzaContent :pizzaParams="pizzaParams" />
    </div>
  </form>
</template>

<script>
import pizzaData from "@/static/pizza.json";
import { getPizzaValues } from "@/common/helpers";
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
      pizzaSelectors: {
        dough: null,
        size: null,
        sauce: null,
        fillings: null,
      },
      pizzaParams: {
        name: "",
        price: 0,
        validate: false,
        type: "",
      },
    };
  },
};
</script>
