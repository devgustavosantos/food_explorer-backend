const knex = require("../../database/knex");

class OrderRepository {
  async create(order) {
    const orderId = await knex("orders").insert(order);

    return orderId[0];
  }

  async findById(id) {
    const order = await knex("orders").where({ id }).first();

    return order;
  }

  async findMealsOfAnOrder(order_id) {
    const meals = await knex("meals")
      .select([
        "meals.id",
        "meals.title",
        "meals.price",
        "meals.image",
        "orders_meals.meal_amount",
      ])
      .innerJoin("orders_meals", "orders_meals.meal_id", "meals.id")
      .where("orders_meals.order_id", order_id);

    return meals;
  }

  async findAllOrders() {
    const orders = await knex("orders")
      .select([
        "orders.id",
        "orders.status",
        "orders.created_at",
        "orders_meals.id as order_meal_id",
        "meals.title",
        "orders_meals.meal_amount",
      ])
      .innerJoin("orders_meals", "orders_meals.order_id", "orders.id")
      .innerJoin("meals", "meals.id", "orders_meals.meal_id");

    return orders;
  }

  async findAllOrdersFromASingleUser(user_id) {
    const orders = await knex("orders")
      .select([
        "orders.id",
        "orders.status",
        "orders.created_at",
        "orders_meals.id as order_meal_id",
        "meals.title",
        "orders_meals.meal_amount",
      ])
      .innerJoin("orders_meals", "orders_meals.order_id", "orders.id")
      .innerJoin("meals", "meals.id", "orders_meals.meal_id")
      .where("orders.user_id", user_id);

    return orders;
  }

  async update({ order_id, status }) {
    await knex("orders").update({ status }).where({ id: order_id });
  }
}

module.exports = OrderRepository;
