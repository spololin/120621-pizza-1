import miscData from "@/static/misc.json";
import { createUUIDv4 } from "@/common/helpers";

const state = {
  pizzas: [],
  misc: [],
};

export default {
  namespaced: true,
  state,
  actions: {
    addToCart({ commit }, pizza) {
      commit("addPizzaToCart", { ...pizza, id: createUUIDv4(), count: 1 });
    },
    fetchMisc({ commit }) {
      commit("setMisc", miscData.map(misc => ({ ...misc, count: 0 })));
    },
    changeCountMisc({ commit }, misc) {
      commit("changeCountMisc", misc);
    },
    changeCountPizza({ commit }, pizza) {
      if (pizza.count === 1 && pizza.operation === "decrease") {
        commit("deletePizza", pizza.id);
      }
      commit("changeCountPizza", pizza);
    },
    setEditPizza({ commit }, pizza) {
      commit("setEditPizza", pizza);
    },
    sendOrder() {
      //TODO send order on server
    },
  },
  mutations: {
    addPizzaToCart(state, pizza) {
      state.pizzas.push(pizza);
    },
    setMisc(state, misc) {
      state.misc = misc;
    },
    changeCountMisc(state, misc) {
      state.misc = state.misc.map(elem => {
        return elem.id !== misc.id ? elem : {
          ...elem,
          count: misc.operation === "increase" ? ++elem.count : --elem.count,
        };
      });
    },
    changeCountPizza(state, pizza) {
      state.pizzas = state.pizzas.map(elem => {
        return elem.id !== pizza.id ? elem : {
          ...elem,
          count: pizza.operation === "increase" ? ++elem.count : --elem.count,
        };
      });
    },
    deletePizza(state, id) {
      state.pizzas = state.pizzas.filter(elem => elem.id !== id);
    },
    setEditPizza(state, pizza) {
      state.pizzas = state.pizzas.map(elem => elem.id !== pizza.id ? elem : pizza);
    },
  },
  getters: {
    pizzas: state => state.pizzas,
    countPizzaInCart: state => state.pizzas.length,
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
    miscs: state => state.misc,
  },
};
