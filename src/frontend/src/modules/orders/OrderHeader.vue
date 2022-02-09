<template>
  <div class="order__wrapper">
    <div class="order__number">
      <b>Заказ #{{ order.id }}</b>
    </div>

    <div class="order__sum">
      <span>Сумма заказа: {{ order.price }} ₽</span>
    </div>

    <div class="order__button">
      <button
        type="button"
        class="button button--border"
      >
        Удалить
      </button>
    </div>
    <div class="order__button">
      <button
        type="button"
        class="button"
      >
        Повторить
      </button>
    </div>
  </div>
</template>
<script>
export default {
  name: "OrderHeader",
  props: {
    order: {
      type: Object,
      required: true,
    },
  },
};
</script>
