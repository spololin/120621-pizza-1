import { PIZZA_VALUES } from "./constants";

export const getPizzaValues = (pizza) => ({
  doughs: (pizza.dough || []).map((dough) => ({
    ...dough,
    value: PIZZA_VALUES.dough[dough.name],
    checked: !--dough.id,
    type: "doughs",
  })),
  fillings: (pizza.ingredients || []).map((ingredient) => ({
    ...ingredient,
    value: PIZZA_VALUES.ingredients[ingredient.name],
    type: "ingredient",
    count: 0,
    permissions: {
      increase: false,
      decrease: true,
    },
  })),
  sauces: (pizza.sauces || []).map((sauce) => ({
    ...sauce,
    value: PIZZA_VALUES.sauces[sauce.name],
    checked: !--sauce.id,
    type: "sauces",
  })),
  sizes: (pizza.sizes || []).map((size) => ({
    ...size,
    value: PIZZA_VALUES.sizes[size.name],
    checked: !--size.id,
    type: "sizes",
  })),
});
