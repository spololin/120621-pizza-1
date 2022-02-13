<template>
  <main class="layout">
    <div class="layout__content">
      <OrderTitle />
      <OrderItem
        v-for="order in transformOrders"
        :key="order.id"
        :order="order"
      />
    </div>
  </main>
</template>

<script>
import { mapActions, mapGetters, mapState } from "vuex";
import { GET_ORDERS } from "@/store/mutation-types";
import OrderItem from "@/modules/orders/OrderItem";
import OrderTitle from "@/modules/orders/OrderTitle";

export default {
  name: "Orders",
  components: {
    OrderTitle,
    OrderItem,
  },
  computed: {
    ...mapState("Orders", ["orders"]),
    ...mapGetters("Orders", ["transformOrders"]),
  },
  created() {
    this.getOrders();
  },
  methods: {
    ...mapActions("Orders", {
      getOrders: GET_ORDERS,
    }),
  },
};
</script>
