import { createUUIDv4 } from "@/common/helpers";
import {
  ADD_PIZZA_TO_CART,
  CHANGE_COUNT_MISC,
  RESET_PIZZA_CART,
  CHANGE_COUNT_PIZZA,
} from "../mutation-types";

const setupPizzasState = () => ([]);

export default {
  namespaced: true,
  state: {
    pizzas: setupPizzasState(),
    misc: [],
  },
  actions: {
    addToCart({ commit, rootGetters }) {
      commit(ADD_PIZZA_TO_CART, rootGetters["Builder/buildPizza"]);
    },
    async getMisc({ commit }) {
      const data = await this.$api.misc.query();
      commit("setMisc", data.map(misc => ({ ...misc, count: 0 })));
    },
  },
  mutations: {
    [ADD_PIZZA_TO_CART](state, pizza) {
      const idx = state.pizzas.findIndex(p => p.id === pizza.id);
      if (~idx) {
        state.pizzas = [
          ...state.pizzas.slice(0, idx),
          pizza,
          ...state.pizzas.slice(idx + 1),
        ];
      } else {
        state.pizzas.push({ ...pizza, id: createUUIDv4(), count: 1 });
      }
    },
    setMisc(state, misc) {
      state.misc = misc;
    },
    [CHANGE_COUNT_MISC](state, misc) {
      state.misc = state.misc.map(elem => {
        return elem.id !== misc.id ? elem : {
          ...elem,
          count: misc.operation === "increase" ? ++elem.count : --elem.count,
        };
      });
    },
    [CHANGE_COUNT_PIZZA](state, pizza) {
      const resultValue = pizza.count + (pizza.operation === "increase" ? 1 : -1);

      if (resultValue === 0) {
        state.pizzas = state.pizzas.filter(p => p.id !== pizza.id);
      } else {
        state.pizzas = state.pizzas.map(elem => {
          return elem.id !== pizza.id ? elem : {
            ...elem,
            count: pizza.operation === "increase" ? elem.count + 1 : elem.count - 1,
          };
        });
      }
    },
    [RESET_PIZZA_CART](state) {
      state.pizzas = setupPizzasState();
    },
  },
  getters: {
    totalCost: state => {
      const totalCostPizzas = state.pizzas.reduce((acc, elem) => {
        const { price, count } = elem;
        return acc + count * price;
      }, 0);
      const totalCostMisc = state.misc.reduce((acc, elem) => {
        const { price, count } = elem;
        return acc + count * price;
      }, 0);

      return totalCostPizzas + totalCostMisc;
    },
    miscForOrder: state => {
      return state.misc.filter(m => m.count).map(elem => {
        return {
          miscId: elem.id,
          quantity: elem.count,
        };
      });
    },
    pizzasForOrder: state => {
      const x = state.pizzas.map(p => {
        return {
          name: p.name,
          sauceId: p.sauce.id,
          doughId: p.dough.id,
          sizeId: p.size.id,
          quantity: p.count,
          ingredients: p.fillings.map(f => {
            return {
              ingredientId: f.id,
              quantity: f.count,
            };
          }),
        };
      });

      console.log(111, x);
      return x;
    },
  },
};
