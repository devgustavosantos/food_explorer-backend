const MealRepository = require("../repositories/meal/MealRepository");
const OrderRepository = require("../repositories/order/OrderRepository");
const OrderMealRepository = require("../repositories/order_meal/OrderMealRepository");

const OrderCreateService = require("../services/order/OrderCreateService");
const OrderUpdateService = require("../services/order/OrderUpdateService");
const OrderSearchService = require("../services/order/OrderSearchService");
const OrderMealCreateService = require("../services/order_meal/OrderMealCreateService");

const MealIndexByIdService = require("../services/meal/MealIndexByIdService");

class OrdersControllers {
  async create(request, response) {
    const user_id = Number(request.query.user_id);
    const { meals_ids } = request.body;

    const mealRepository = new MealRepository();
    const orderRepository = new OrderRepository();
    const orderMealRepository = new OrderMealRepository();

    const orderCreateService = new OrderCreateService(
      orderRepository,
      mealRepository
    );

    const orderMealCreateService = new OrderMealCreateService(
      orderMealRepository
    );

    const mealIndexByIdService = new MealIndexByIdService(mealRepository);

    const foundMeals = await mealIndexByIdService.execute(meals_ids);

    const orderId = await orderCreateService.execute({
      user_id,
      meals: foundMeals,
    });

    await orderMealCreateService.execute({ user_id, meals: foundMeals });

    return response.json();
  }

  async update(request, response) {
    const { order_id, status } = request.body;

    const orderRepository = new OrderRepository();
    const orderUpdateService = new OrderUpdateService(orderRepository);
    const orderSearchService = new OrderSearchService(orderRepository);

    await orderSearchService.execute(order_id);

    await orderUpdateService.execute({ order_id, status });

    return response.json({});
  }
}

module.exports = OrdersControllers;
