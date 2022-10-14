class OrderMealCreateService {
  constructor(orderMealRepository) {
    this.orderMealRepository = orderMealRepository;
  }

  async execute({ meals, orderId }) {
    const orderWithMeals = meals.map(meal => {
      return {
        order_id: orderId,
        meal_id: meal.id,
      };
    });

    await this.orderMealRepository.create(orderWithMeals);
  }
}

module.exports = OrderMealCreateService;
