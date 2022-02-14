import {
  GET_ORDERS,
  POST_ORDER,
  DELETE_ORDER,
  REPEAT_ORDER,
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
    async [DELETE_ORDER]({ commit }, id) {
      await this.$api.orders.delete(id);

      commit(DELETE_ORDER, id);
    },
    [REPEAT_ORDER]({ getters, rootState }, orderId) {
      const order = getters.transformOrders.find((o) => o.id === orderId);

      rootState["Cart"].pizzas = order.pizzas;
      rootState["Cart"].misc = rootState["Cart"].misc.map((misc) => {
        const miscElem = order.misc.find(
          (miscItem) => miscItem.miscId === misc.id
        );

        return {
          ...misc,
          count: miscElem?.count ?? misc.count,
        };
      });
      rootState["Addresses"].typeReceiving = order?.address?.id ?? "myself";
      rootState["Addresses"].receivingForm.phone = order.phone;
      rootState["Addresses"].receivingForm.street = order.address.street;
      rootState["Addresses"].receivingForm.building = order.address.building;
      rootState["Addresses"].receivingForm.flat = order.address.flat;
    },
  },
  mutations: {
    setOrders(state, data) {
      state.orders = data;
    },
    [DELETE_ORDER](state, orderId) {
      const idx = state.orders.findIndex((o) => o.id === orderId);

      state.orders = [
        ...state.orders.slice(0, idx),
        ...state.orders.slice(idx + 1),
      ];
    },
  },
  getters: {
    transformOrders: (state, _g, rootState) => {
      const { misc } = rootState["Cart"];
      const {
        doughs: builderDough,
        sizes: builderSizes,
        sauces: builderSauces,
        fillings: builderIngredients,
      } = rootState["Builder"].builder;

      return state.orders.map((orderItem) => {
        const {
          orderMisc = [],
          orderPizzas = [],
          orderAddress = {},
          id: orderId,
          phone,
        } = orderItem;
        let orderPrice = 0;

        const newMisc = orderMisc.map((miscItem) => {
          const { miscId, id, quantity } = miscItem;
          const { image, name, price } = misc.find((m) => m.id === miscId);
          const miscPrice = quantity * price;
          orderPrice += miscPrice;

          return {
            id,
            miscId,
            image,
            name,
            price,
            count: quantity,
          };
        });

        const newPizzas = orderPizzas.map((pizzaItem) => {
          const { name, doughId, sauceId, sizeId, ingredients, quantity, id } =
            pizzaItem;
          let ingredientsPrice = 0;

          const doughData = builderDough.find((d) => d.id === doughId);
          const sauceData = builderSauces.find((s) => s.id === sauceId);
          const sizeData = builderSizes.find((s) => s.id === sizeId);
          const ingredientsData = ingredients.map((i) => {
            const { ingredientId, quantity } = i;
            const data = builderIngredients.find((x) => x.id === ingredientId);
            ingredientsPrice += data.price * quantity;

            return {
              ...data,
              count: quantity,
            };
          });

          const pizzaPrice =
            (doughData.price + sauceData.price + ingredientsPrice) *
            sizeData.multiplier;

          orderPrice += pizzaPrice * quantity;

          return {
            name,
            id,
            count: quantity,
            price: pizzaPrice,
            dough: doughData,
            sauce: sauceData,
            size: sizeData,
            fillings: ingredientsData,
          };
        });

        return {
          id: orderId,
          price: orderPrice,
          misc: newMisc,
          pizzas: newPizzas,
          address: orderAddress,
          phone,
        };
      });
    },
  },
};
