import { getPizzaValues } from "@/common/helpers";
import pizzaData from "@/static/pizza.json";
import { MAX_COUNT_TYPE_INGREDIENT } from "@/common/constants";
import { cloneDeep } from 'lodash';
import {
  SET_NAME_PIZZA,
  EDIT_PIZZA,
  UPDATE_SELECTOR_ITEM,
  UPDATE_INGREDIENT_COUNTER,
  RESET_BUILDER,
  SET_BUILDER_COMPONENTS,
} from "@/store/mutation-types";

let initialBuilder = {};

export default {
  namespaced: true,
  state: {
    doughs: [],
    fillings: [],
    sauces: [],
    sizes: [],
    name: "",
  },
  actions: {
    fetchBuilderComponents({ commit }) {
      initialBuilder = getPizzaValues(pizzaData);
      commit(SET_BUILDER_COMPONENTS, initialBuilder);
    },
    dropIngredient({ commit }, filling) {
      commit(UPDATE_INGREDIENT_COUNTER, { ...filling, operation: "increase" });
    },
  },
  mutations: {
    [SET_BUILDER_COMPONENTS](state, builderComponents) {
      Object.assign(state, builderComponents);
    },
    [UPDATE_SELECTOR_ITEM](state, selector) {
      state[selector.type] = state[selector.type].map((elem) => ({
        ...elem,
        checked: selector.id === elem.id,
      }));
    },
    [UPDATE_INGREDIENT_COUNTER](state, filling) {
      state.fillings = state.fillings.map((elem) => {
        if (elem.id !== filling.id) return elem;

        const count =
          filling.operation === "increase" ? ++filling.count : --filling.count;

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
    [SET_NAME_PIZZA](state, name) {
      state.name = name;
    },
    [RESET_BUILDER](state) {
      Object.assign(state, initialBuilder);
    },
    [EDIT_PIZZA](state, pizza) {
      const pizzaForBuilder = cloneDeep(initialBuilder);
      pizzaForBuilder.doughs = pizzaForBuilder.doughs.map(dough => ({
        ...dough,
        checked: dough.id === pizza.selectedDough.id,
      }));

      pizzaForBuilder.sizes = pizzaForBuilder.sizes.map(size => ({
        ...size,
        checked: size.id === pizza.selectedSize.id,
      }));

      pizzaForBuilder.sauces = pizzaForBuilder.sauces.map(sauce => ({
        ...sauce,
        checked: sauce.id === pizza.selectedSauce.id,
      }));

      for (const selectFilling of pizza.selectedFillings) {
        const idx = pizzaForBuilder.fillings.findIndex(elem => elem.id === selectFilling.id);
        pizzaForBuilder.fillings[idx].count = selectFilling.count;
      }

      pizzaForBuilder.name = pizza.name;
      pizzaForBuilder.id = pizza.id;
      pizzaForBuilder.price = pizza.price;
      pizzaForBuilder.count = pizza.count;

      state = pizzaForBuilder;
    },
  },
  getters: {
    selectedDough: state => state.doughs.find(({ checked }) => checked),
    selectedSize: state => state.sizes.find(({ checked }) => checked),
    selectedSauce: state => state.sauces.find(({ checked }) => checked),
    selectedFillings: state => state.fillings.filter(({ count }) => count),
    validateBuilder: (state, { selectedFillings }) =>
      !(selectedFillings.length && state.name.length),
    pizzaPrice: (state, { selectedFillings, selectedDough, selectedSauce, selectedSize }) => {
      const fillingsPrice = selectedFillings.reduce((acc, elem) => {
        const { count, price } = elem;
        return acc + count * price;
      }, 0);

      return (
        (selectedDough.price +
          selectedSauce.price +
          fillingsPrice) *
        selectedSize.multiplier
      );
    },
    buildPizza: (state, { selectedFillings, selectedDough, selectedSauce, selectedSize, pizzaPrice }) => ({
      fillings: selectedFillings,
      dough: selectedDough,
      sauce: selectedSauce,
      size: selectedSize,
      name: state.name,
      price: pizzaPrice,
    }),
  },
};

