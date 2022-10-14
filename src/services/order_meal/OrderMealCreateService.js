class OrderMealCreateService {
  constructor(orderMealRepository) {
    this.orderMealRepository = orderMealRepository;
  }

  async execute({ meals_ids, orderId }) {
    const orderWithMeals = meals_ids.map(meal_id => {
      return {
        order_id: orderId,
        meal_id: meal_id,
      };
    });

    await this.orderMealRepository.create(orderWithMeals);
  }
}

module.exports = OrderMealCreateService;
