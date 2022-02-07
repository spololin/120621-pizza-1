export const formatOrders = (orders) => {
  return orders.map(order => ({
    ...order,
    orderPizzas: order?.orderPizzas ?? [],
    orderMisc: order?.orderMisc ?? [],
    orderAddress: order?.orderAddress ?? {},
  }));
};
