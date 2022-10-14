const knex = require("../../database/knex");

class Order_MealRepository {
  async create(orders_meals) {
    await knex("orders_meals").insert(orders_meals);
  }
}

module.exports = Order_MealRepository;
