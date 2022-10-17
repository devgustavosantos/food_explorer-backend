class OrderShowService {
  constructor(orderRepository) {
    this.orderRepository = orderRepository;
  }

  async execute(order_id) {
    const order = await this.orderRepository.findById(order_id);

    const mealsOfThisOrder = await this.orderRepository.findMealsOfAnOrder(
      order_id
    );

    console.log({ order, mealsOfThisOrder });

    return order;
  }
}

module.exports = OrderShowService;
