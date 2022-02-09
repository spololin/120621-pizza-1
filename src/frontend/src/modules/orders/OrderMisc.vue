<template>
  <ul
    v-if="miscList"
    class="order__additional"
  >
    <li
      v-for="miscItem in miscList"
      :key="miscItem.id"
    >
      <img
        :src="miscItem.image"
        width="20"
        height="30"
        :alt="miscItem.name"
      >
      <p>
        <span>{{ miscItem.name }}</span>
        <b>{{ miscItem.price * miscItem.count }} ₽</b>
      </p>
    </li>
  </ul>
</template>
<script>
export default {
  name: "OrderMisc",
  props: {
    miscList: {
      type: Array,
      required: true,
    },
  },
};
</script>
