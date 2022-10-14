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

  async update({ order_id, status }) {
    await knex("orders").update({ status }).where({ id: order_id });
  }
}

module.exports = OrderRepository;
