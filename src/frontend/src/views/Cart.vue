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
          v-if="!countPizzaInCart"
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
              v-for="misc in miscs"
              :key="misc.id"
              :misc="misc"
            />
          </ul>
        </div>

        <CartReceivingOrder />
      </div>
    </main>
    <CartFooter />
  </form>
</template>

<script>
import { mapGetters } from "vuex";
import CartPizzaItem from "@/modules/cart/CartPizzaItem";
import CartAdditionalItem from "@/modules/cart/CartAdditionalItem";
import CartReceivingOrder from "@/modules/cart/CartReceivingOrder";
import CartFooter from "@/modules/cart/CartFooter";

export default {
  name: "Cart",
  components: { CartFooter, CartReceivingOrder, CartAdditionalItem, CartPizzaItem },
  computed: {
    ...mapGetters("Cart", ["countPizzaInCart", "pizzas", "miscs"]),
  },
};
</script>
