const AppError = require("../../utils/AppError");

class OrderCreateService {
  constructor(orderRepository) {
    this.orderRepository = orderRepository;
  }

  async execute({ user_id, meals_sent, foundMeals }) {
    if (foundMeals.length !== meals_sent.length) {
      throw new AppError("Uma ou mais refeições não foram encontradas.");
    }

    const prices = meals_sent.map(mealSend => {
      const mealPrice = foundMeals.find(
        mealFounded => mealFounded.id == mealSend.meal_id
      );

      return parseFloat(mealPrice.price * mealSend.amount);
    });

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
