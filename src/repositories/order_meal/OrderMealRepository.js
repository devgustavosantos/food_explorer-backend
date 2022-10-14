const knex = require("../../database/knex");

class OrderMealRepository {
  async create(orders_meals) {
    await knex("orders_meals").insert(orders_meals);
  }
}

module.exports = OrderMealRepository;
