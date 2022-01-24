import axios from '@/plugins/axios';
import { PIZZA_VALUES } from "@/common/constants";

export class BuilderApiService {
  #resources;
  constructor(resources) {
    this.#resources = resources;
  }

  getPizzaValues(components) {
    return  {
      doughs: (components.find(elem => elem.config.url === "dough").data || []).map((dough, idx) => ({
        ...dough,
        value: PIZZA_VALUES.dough[dough.name],
        checked: idx === 0,
        type: "doughs",
      })),
      fillings: (components.find(elem => elem.config.url === "ingredients").data || []).map((ingredient) => ({
        ...ingredient,
        value: PIZZA_VALUES.ingredients[ingredient.name],
        type: "ingredient",
        count: 0,
        permissions: {
          decrease: false,
          increase: true,
        },
      })),
      sauces: (components.find(elem => elem.config.url === "sauces").data || []).map((sauce, idx) => ({
        ...sauce,
        value: PIZZA_VALUES.sauces[sauce.name],
        checked: idx === 0,
        type: "sauces",
      })),
      sizes: (components.find(elem => elem.config.url === "sizes").data || []).map((size, idx) => ({
        ...size,
        value: PIZZA_VALUES.sizes[size.name],
        checked: idx === 0,
        type: "sizes",
      })),
    };
  }

  async get() {
    return Promise.all(
      this.#resources.map((resource) => {
        return axios.get(resource);
      }),
    ).then((values) => {
      return this.getPizzaValues(values);
    });
  }
}
