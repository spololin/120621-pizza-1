import {
  LOGOUT_USER,
  SET_USER_DATA,
} from "@/store/mutation-types";

const initialUser = () => ({});

export default {
  namespaced: true,
  state: {
    user: initialUser(),
    addresses: [
      {
        id: "3",
        name: "Адрес1",
        street: "Улица1",
        home: "Дом1",
        room: "Комната1",
      },
    ],
  },
  actions: {
    async login({ dispatch }, credentials) {
      const data = await this.$api.auth.login(credentials);
      this.$jwt.saveToken(data.token);
      this.$api.auth.setAuthHeader();

      dispatch("getMe");
    },
    async [LOGOUT_USER]({ commit }, sendRequest) {
      if (sendRequest) {
        await this.$api.auth.logout();
      }

      this.$jwt.destroyToken();
      this.$api.auth.setAuthHeader();

      commit(LOGOUT_USER);
    },
    async getMe({ dispatch, commit }) {
      try {
        const data = await this.$api.auth.getMe();
        commit(SET_USER_DATA, data);
      } catch {
        dispatch(LOGOUT_USER, false);
      }
    },
  },
  mutations: {
    [SET_USER_DATA](state, userData) {
      state.user = userData;
    },
    [LOGOUT_USER](state) {
      state.user = initialUser();
    },
  },
  getters: {
    isAuth: state => state.user.id,
  },
};
