import { uniqueId } from 'lodash';

const state = {
  pizzas: [],
  misc: [],
};

export default {
  namespaced: true,
  state,
  actions: {
    addToCart({ commit }, pizza) {
      commit("addPizzaToCart", { ...pizza, id: uniqueId(), count: 1 });
    },
  },
  mutations: {
    addPizzaToCart(state, pizza) {
      state.pizzas.push(pizza);
    },
  },
  getters: {
    countPizzaInCart: state => state.pizzas.length,
    totalCost: state => state.pizzas.reduce((acc, elem) => {
      const { price, count } = elem;
      return acc + count * price;
    }, 0),
  },
};
