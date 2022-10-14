class OrderCreateService {
  constructor(orderRepository) {
    this.orderRepository = orderRepository;
  }

  async execute({ user_id, meals }) {
    const prices = meals.map(meal => parseFloat(meal.price));

    const orderPrice = prices
      .reduce((prevValue, elem) => prevValue + elem)
      .toFixed(2);

    const order = {
      status: "pending",
      price: orderPrice,
      user_id,
    };

    const orderId = await this.orderRepository.create(order);

    return orderId;
  }
}

module.exports = OrderCreateService;
