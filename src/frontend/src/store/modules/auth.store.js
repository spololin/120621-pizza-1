import user from "@/static/user.json";
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
    login({ commit }, credentials) {
      console.log(credentials);
      commit(SET_USER_DATA, user);
    },
    logoutUser({ commit }) {
      commit(LOGOUT_USER);
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
