const MealRepository = require("../repositories/meal/MealRepository");
const OrderRepository = require("../repositories/order/OrderRepository");
const OrderMealRepository = require("../repositories/order_meal/OrderMealRepository");

const OrderCreateService = require("../services/order/OrderCreateService");
const OrderMealCreateService = require("../services/order_meal/OrderMealCreateService");

class OrdersControllers {
  async create(request, response) {
    const user_id = Number(request.query.user_id);
    const { meals_ids } = request.body;

    const mealRepository = new MealRepository();
    const orderRepository = new OrderRepository();
    const orderCreateService = new OrderCreateService(
      orderRepository,
      mealRepository
    );

    const orderMealRepository = new OrderMealRepository();
    const orderMealCreateService = new OrderMealCreateService(
      orderMealRepository
    );

    const orderId = await orderCreateService.execute({ user_id, meals_ids });

    await orderMealCreateService.execute({ meals_ids, orderId });

    return response.json();
  }
}

module.exports = OrdersControllers;
