<template>
  <section class="sheet order">
    <OrderHeader :order="order" />
    <OrderPizzas :pizzas="order.pizzas" />
    <OrderMisc :misc-list="order.misc" />
    <OrderAddress :address="order.address" />
  </section>
</template>
<script>
import OrderHeader from "@/modules/orders/OrderHeader";
import OrderAddress from "@/modules/orders/OrderAddress";
import OrderPizzas from "@/modules/orders/OrderPizzas";
import OrderMisc from "@/modules/orders/OrderMisc";
export default {
  name: "OrderItem",
  components: {
    OrderMisc,
    OrderPizzas,
    OrderAddress,
    OrderHeader,
  },
  props: {
    order: {
      type: Object,
      required: true,
    },
  },
};
</script>
