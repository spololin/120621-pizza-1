import user from "@/static/user.json";
import { RESET_USER } from "@/store/mutation-types";

const setupState = () => ({
  user: {},
});

export default {
  namespaced: true,
  state: setupState(),
  actions: {
    login({ commit }, credentials) {
      console.log(credentials);
      commit("setUserData", user);
    },
    resetUserState({ commit }) {
      commit("resetState");
    },
  },
  mutations: {
    setUserData(state, userData) {
      state.user = userData;
    },
    [RESET_USER](state) {
      Object.assign(state, setupState());
    },
  },
  getters: {
    isAuth: state => state.user.id,
  },
};
