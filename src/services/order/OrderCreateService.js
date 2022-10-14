class OrderCreateService {
  constructor(orderRepository, mealRepository) {
    this.orderRepository = orderRepository;
    this.mealRepository = mealRepository;
  }

  async execute({ user_id, meals_ids }) {
    const meals = await this.mealRepository.findManyByIds(meals_ids);

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
