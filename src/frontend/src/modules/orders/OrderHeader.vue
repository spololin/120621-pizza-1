<template>
  <div class="order__wrapper">
    <div class="order__number">
      <b>Заказ #{{ order.id }}</b>
    </div>

    <div class="order__sum">
      <span>Сумма заказа: {{ order.price }} ₽</span>
    </div>

    <div class="order__button">
      <AppButton
        class="button--border"
        @onClick="deleteOrder(order.id)"
      >
        Удалить
      </AppButton>
    </div>
    <div class="order__button">
      <AppButton @onClick="repeat()">
        Повторить
      </AppButton>
    </div>
  </div>
</template>
<script>
import { mapActions } from "vuex";
import { DELETE_ORDER, REPEAT_ORDER } from "@/store/mutation-types";

export default {
  name: "OrderHeader",
  props: {
    order: {
      type: Object,
      required: true,
    },
  },
  methods: {
    ...mapActions("Orders", {
      deleteOrder: DELETE_ORDER,
      repeatOrder: REPEAT_ORDER,
    }),
    repeat() {
      this.repeatOrder(this.order.id);
      this.$router.push("/cart");
    },
  },
};
</script>
