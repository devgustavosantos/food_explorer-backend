const knex = require("../../database/knex");

class OrderRepository {
  async create(order) {
    const orderId = await knex("orders").insert(order);

    return orderId[0];
  }
}

module.exports = OrderRepository;
