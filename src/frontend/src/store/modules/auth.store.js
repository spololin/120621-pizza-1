import user from "@/static/user.json";

const setupState = () => ({
  user: {},
});

export default {
  namespaced: true,
  state: setupState(),
  actions: {
    login({ commit }, credentials) {
      //TODO request for user data
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
    resetState(state) {
      Object.assign(state, setupState());
    },
  },
  getters: {
    isAuth: state => state.user.id,
  },
};
