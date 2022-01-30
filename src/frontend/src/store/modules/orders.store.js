import {
  POST_ORDER,
} from "@/store/mutation-types";

export default {
  namespaced: true,
  state: {
    orders: [],
  },
  actions: {
    async [POST_ORDER]({ dispatch, rootState, rootGetters }) {
      const order = {
        userId: rootState.User.user?.id ?? null,
        phone: rootState.Addresses.receivingForm.phone,
        address: rootGetters["Addresses/addressForOrder"],
        pizzas: rootGetters["Cart/pizzasForOrder"],
        misc: rootGetters["Cart/miscForOrder"],
      };

      console.log(order);

      const data = await this.$api.orders.query(order);

      console.log(data);

      if (data.id) {
        dispatch("getOrders");
      }
    },
    async getOrders({ commit }) {
      const data = await this.$api.orders.get();

      commit("setOrders", data);
    },
  },
  mutations: {
    setOrsers(state, data) {
      debugger;
      state.orders = data;
    },
  },
};
