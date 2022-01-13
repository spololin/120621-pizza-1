import { getPizzaValues } from "@/common/helpers";
import pizzaData from "@/static/pizza.json";
import { MAX_COUNT_TYPE_INGREDIENT } from "@/common/constants";
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
    id: null,
    name: "",
    price: null,
    count: null,
    doughs: [],
    fillings: [],
    sauces: [],
    sizes: [],
  },
  actions: {
    fetchBuilderComponents({ commit }) {
      initialBuilder = getPizzaValues(pizzaData);
      commit(SET_BUILDER_COMPONENTS, { ...initialBuilder });
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
      Object.assign(state, {
        ...initialBuilder,
        id: "",
        name: "",
        count: null,
        price: null,
      });
    },
    [EDIT_PIZZA](state, pizza) {
      const pizzaForBuilder = { ...initialBuilder };
      state.doughs = pizzaForBuilder.doughs.map(dough => ({
        ...dough,
        checked: dough.id === pizza.dough.id,
      }));

      state.sizes = pizzaForBuilder.sizes.map(size => ({
        ...size,
        checked: size.id === pizza.size.id,
      }));

      state.sauces = pizzaForBuilder.sauces.map(sauce => ({
        ...sauce,
        checked: sauce.id === pizza.sauce.id,
      }));

      state.fillings = state.fillings.map(filling => {
        const findFilling = pizza.fillings.find(elem => elem.id === filling.id);

        return {
          ...filling,
          count: findFilling ? findFilling.count : filling.count,
        };
      });

      state.name = pizza.name;
      state.id = pizza.id;
      state.price = pizza.price;
      state.count = pizza.count;
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
      id: state.id,
      name: state.name,
      count: state.count,
      price: pizzaPrice,
      fillings: selectedFillings,
      dough: selectedDough,
      sauce: selectedSauce,
      size: selectedSize,
    }),
  },
};

