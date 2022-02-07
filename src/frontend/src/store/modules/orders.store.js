import {
  GET_ORDERS,
  POST_ORDER,
} from "@/store/mutation-types";

export default {
  namespaced: true,
  state: {
    orders: [],
  },
  actions: {
    async [POST_ORDER]({ rootState, rootGetters }) {
      const order = {
        userId: rootState.User.user?.id ?? null,
        phone: rootState.Addresses.receivingForm.phone,
        address: rootGetters["Addresses/addressForOrder"],
        pizzas: rootGetters["Cart/pizzasForOrder"],
        misc: rootGetters["Cart/miscForOrder"],
      };

      return await this.$api.orders.post(order);
    },
    async [GET_ORDERS]({ commit, rootGetters }) {
      if (rootGetters["User/isAuth"]) {
        const data = await this.$api.orders.query();

        commit("setOrders", data);
      }
    },
  },
  mutations: {
    setOrders(state, data) {
      state.orders = data;
    },
  },
};
