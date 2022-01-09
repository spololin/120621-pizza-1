import { PIZZA_VALUES } from "./constants";

export const getPizzaValues = (pizza) => ({
  doughs: (pizza.dough || []).map((dough, idx) => ({
    ...dough,
    value: PIZZA_VALUES.dough[dough.name],
    checked: idx === 0,
    type: "doughs",
  })),
  fillings: (pizza.ingredients || []).map((ingredient) => ({
    ...ingredient,
    value: PIZZA_VALUES.ingredients[ingredient.name],
    type: "ingredient",
    count: 0,
    permissions: {
      decrease: false,
      increase: true,
    },
  })),
  sauces: (pizza.sauces || []).map((sauce, idx) => ({
    ...sauce,
    value: PIZZA_VALUES.sauces[sauce.name],
    checked: idx === 0,
    type: "sauces",
  })),
  sizes: (pizza.sizes || []).map((size, idx) => ({
    ...size,
    value: PIZZA_VALUES.sizes[size.name],
    checked: idx === 0,
    type: "sizes",
  })),
  name: "",
});

export const createUUIDv4 = () => {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, c => {
    const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
};
