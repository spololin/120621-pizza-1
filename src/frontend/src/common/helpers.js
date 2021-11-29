import { PIZZA_VALUES } from "./constants";

export const getPizzaValues = (pizza) => ({
  doughs: (pizza.dough || []).map((dough) => ({
    ...dough,
    value: PIZZA_VALUES.dough[dough.name],
    checked: !--dough.id,
  })),
  ingredients: (pizza.ingredients || []).map((ingridient) => ({
    ...ingridient,
    value: PIZZA_VALUES.ingredients[ingridient.name],
  })),
  sauces: (pizza.sauces || []).map((sauce) => ({
    ...sauce,
    value: PIZZA_VALUES.sauces[sauce.name],
    checked: !--sauce.id,
  })),
  sizes: (pizza.sizes || []).map((size) => ({
    ...size,
    value: PIZZA_VALUES.sizes[size.name],
    checked: !--size.id,
  })),
});
