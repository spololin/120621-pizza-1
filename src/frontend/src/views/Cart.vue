<template>
  <form
    action=""
    method="post"
    class="layout-form"
  >
    <main class="content cart">
      <div class="container">
        <div class="cart__title">
          <h1 class="title title--big">
            Корзина
          </h1>
        </div>

        <div
          v-if="!pizzas.length"
          class="sheet cart__empty"
        >
          <p>В корзине нет ни одного товара</p>
        </div>

        <ul
          v-else
          class="cart-list sheet"
        >
          <CartPizzaItem
            v-for="pizza in pizzas"
            :key="pizza.id"
            :pizza="pizza"
          />
        </ul>

        <div class="cart__additional">
          <ul class="additional-list">
            <CartAdditionalItem
              v-for="miscItem in misc"
              :key="miscItem.id"
              :misc="miscItem"
            />
          </ul>
        </div>

        <CartReceivingOrder />
      </div>
    </main>
    <CartFooter @openPopup="openPopup" />
    <transition
      name="fade"
    >
      <OrderPopup
        v-if="showPopup"
        @closePopup="closePopup"
      />
    </transition>
  </form>
</template>

<script>
import {mapGetters, mapState} from "vuex";
import CartPizzaItem from "@/modules/cart/CartPizzaItem";
import CartAdditionalItem from "@/modules/cart/CartAdditionalItem";
import CartReceivingOrder from "@/modules/cart/CartReceivingOrder";
import CartFooter from "@/modules/cart/CartFooter";
import { addressList } from "@/common/mixins";
import OrderPopup from "@/views/OrderPopup";
export default {
  name: "Cart",
  components: {
    OrderPopup,
    CartFooter,
    CartReceivingOrder,
    CartAdditionalItem,
    CartPizzaItem,
  },
  mixins: [addressList],
  data: () => ({
    showPopup: false,
  }),
  computed: {
    ...mapState("Cart", ["pizzas", "misc"]),
    ...mapGetters("User", ["isAuth"]),
  },
  methods: {
    openPopup() {
      this.showPopup = true;
    },
    closePopup() {
      this.showPopup = false;
      setTimeout(() => {
        this.$router.push(this.isAuth ? "/orders" : "/").catch(() => {});
      }, 500);
    },
  },
};
</script>
<style lang="scss">
.fade-enter-active {
  animation: fade-in 500ms;
}
.fade-leave-active {
  animation: fade-in 500ms reverse;
}
@keyframes fade-in {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>
