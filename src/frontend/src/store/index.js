import Vue from "vue";
import Vuex from "vuex";
import modules from "@/store/modules";
import VuexPlugins from "@/plugins/vuexPlugins";
import { setAuth } from "@/common/helpers";

Vue.use(Vuex);

const state = () => ({});

const actions = {
  async init({ dispatch }) {
    if (this.$jwt.getToken()) {
      setAuth(this);
    }
    dispatch("Builder/getBuilderComponents");
    dispatch("Cart/getMisc");
  },
  drop({ dispatch }, value) {
    switch (value.type) {
      case "ingredient":
        dispatch("Builder/dropIngredient", value);
        break;
      default:
        break;
    }
  },
};

const mutations = {};

export default new Vuex.Store({
  state,
  actions,
  mutations,
  modules,
  plugins: [VuexPlugins],
});
