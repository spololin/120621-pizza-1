import { MAX_COUNT_TYPE_INGREDIENT } from "@/common/constants";
import {
  SET_NAME_PIZZA,
  EDIT_PIZZA,
  UPDATE_SELECTOR_ITEM,
  UPDATE_INGREDIENT_COUNTER,
  RESET_BUILDER,
} from "@/store/mutation-types";

export default {
  namespaced: true,
  state: {
    builder: {
      id: null,
      name: "",
      price: null,
      count: null,
      doughs: [],
      fillings: [],
      sauces: [],
      sizes: [],
    },
    initialBuilder: {},
  },
  actions: {
    async getBuilderComponents({ commit }) {
      const data = await this.$api.builder.get();
      commit("setBuilderComponents", data);
    },
    dropIngredient({ commit }, filling) {
      commit(UPDATE_INGREDIENT_COUNTER, { ...filling, operation: "increase" });
    },
  },
  mutations: {
    setBuilderComponents(state, builderComponents) {
      state.initialBuilder = builderComponents;
      Object.assign(state.builder, builderComponents);
    },
    [UPDATE_SELECTOR_ITEM](state, selector) {
      state.builder[selector.type] = state.builder[selector.type].map((elem) => ({
        ...elem,
        checked: selector.id === elem.id,
      }));
    },
    [UPDATE_INGREDIENT_COUNTER](state, filling) {
      state.builder.fillings = state.builder.fillings.map((elem) => {
        if (elem.id !== filling.id) return elem;

        const count =
          filling.operation === "increase" ? filling.count + 1 : filling.count - 1;

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
      state.builder.name = name;
    },
    [RESET_BUILDER](state) {
      Object.assign(state.builder, {
        ...state.initialBuilder,
        id: "",
        name: "",
        count: null,
        price: null,
      });
    },
    [EDIT_PIZZA](state, pizza) {
      const pizzaForBuilder = { ...state.initialBuilder };
      state.builder.doughs = pizzaForBuilder.doughs.map(dough => ({
        ...dough,
        checked: dough.id === pizza.dough.id,
      }));

      state.builder.sizes = pizzaForBuilder.sizes.map(size => ({
        ...size,
        checked: size.id === pizza.size.id,
      }));

      state.builder.sauces = pizzaForBuilder.sauces.map(sauce => ({
        ...sauce,
        checked: sauce.id === pizza.sauce.id,
      }));

      state.builder.fillings = state.builder.fillings.map(filling => {
        const findFilling = pizza.fillings.find(elem => elem.id === filling.id);

        return {
          ...filling,
          count: findFilling ? findFilling.count : filling.count,
        };
      });

      state.builder.name = pizza.name;
      state.builder.id = pizza.id;
      state.builder.price = pizza.price;
      state.builder.count = pizza.count;
    },
  },
  getters: {
    selectedDough: state => state.builder.doughs.find(({ checked }) => checked),
    selectedSize: state => state.builder.sizes.find(({ checked }) => checked),
    selectedSauce: state => state.builder.sauces.find(({ checked }) => checked),
    selectedFillings: state => state.builder.fillings.filter(({ count }) => count),
    validateBuilder: (state, { selectedFillings }) =>
      !(selectedFillings.length && state.builder.name.length),
    pizzaPrice: (state, { selectedFillings, selectedDough, selectedSauce, selectedSize }) => {
      const fillingsPrice = selectedFillings.reduce((acc, elem) => {
        const { count, price } = elem;
        return acc + count * price;
      }, 0);

      return (
        (~~selectedDough?.price +
          ~~selectedSauce?.price +
          fillingsPrice) *
        ~~selectedSize?.multiplier
      );
    },
    buildPizza: (state, { selectedFillings, selectedDough, selectedSauce, selectedSize, pizzaPrice }) => ({
      id: state.builder.id,
      name: state.builder.name,
      count: state.builder.count,
      price: pizzaPrice,
      fillings: selectedFillings,
      dough: selectedDough,
      sauce: selectedSauce,
      size: selectedSize,
    }),
  },
};

