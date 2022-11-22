const OrderRepository = require("../repositories/order/OrderRepository");
const OrderCreateService = require("../services/order/OrderCreateService");
const OrderShowService = require("../services/order/OrderShowService");
const OrderUpdateService = require("../services/order/OrderUpdateService");
const OrderSearchService = require("../services/order/OrderSearchService");
const OrderIndexService = require("../services/order/OrderIndexService");

const OrderMealRepository = require("../repositories/order_meal/OrderMealRepository");
const OrderMealCreateService = require("../services/order_meal/OrderMealCreateService");

const MealRepository = require("../repositories/meal/MealRepository");
const MealIndexByIdService = require("../services/meal/MealIndexByIdService");

const UserRepository = require("../repositories/user/UserRepository");
const UserCheckIfIsAdmin = require("../services/user/UserCheckIfIsAdmin");

class OrdersControllers {
  async create(request, response) {
    const user_id = request.user.id;

    const { body: meals_sent } = request;

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

    const foundMeals = await mealIndexByIdService.execute(meals_sent);

    const orderId = await orderCreateService.execute({
      user_id,
      meals_sent,
      foundMeals,
    });

    await orderMealCreateService.execute({
      orderId,
      meals_sent,
    });

    return response.status(201).json();
  }

  async show(request, response) {
    const { order_id } = request.params;

    const orderRepository = new OrderRepository();
    const orderShowService = new OrderShowService(orderRepository);

    const orderWithMeals = await orderShowService.execute(order_id);

    return response.json(orderWithMeals);
  }

  async index(request, response) {
    const user_id = request.user.id;

    const userRepository = new UserRepository();
    const userCheckIfIsAdmin = new UserCheckIfIsAdmin(userRepository);

    const accessLevel = await userCheckIfIsAdmin.execute(user_id);

    const orderRepository = new OrderRepository();
    const orderIndexService = new OrderIndexService(orderRepository);

    const result = await orderIndexService.execute({ user_id, accessLevel });

    return response.json(result);
  }

  async update(request, response) {
    const { order_id, status } = request.body;

    const orderRepository = new OrderRepository();
    const orderUpdateService = new OrderUpdateService(orderRepository);
    const orderSearchService = new OrderSearchService(orderRepository);

    await orderSearchService.execute(order_id);

    await orderUpdateService.execute({ order_id, status });

    return response.status(201).json();
  }
}

module.exports = OrdersControllers;
