import { LOGOUT_USER } from "@/store/mutation-types";
import { setAuth } from "@/common/helpers";

const initialUser = () => ({});

export default {
  namespaced: true,
  state: {
    user: initialUser(),
  },
  actions: {
    async login(_d, credentials) {
      const data = await this.$api.auth.login(credentials);
      this.$jwt.saveToken(data.token);
      setAuth(this);
    },
    async [LOGOUT_USER]({ commit }, sendRequest) {
      if (sendRequest) {
        await this.$api.auth.logout();
      }

      this.$jwt.destroyToken();
      this.$api.auth.setAuthHeader();

      commit(LOGOUT_USER);

      return true;
    },
    async getMe({ dispatch, commit }) {
      try {
        const data = await this.$api.auth.getMe();
        commit("setUserData", data);
      } catch {
        dispatch(LOGOUT_USER, false);
      }
    },
  },
  mutations: {
    setUserData(state, userData) {
      state.user = userData;
    },
    [LOGOUT_USER](state) {
      state.user = initialUser();
    },
  },
  getters: {
    isAuth: (state) => state.user.id,
  },
};
