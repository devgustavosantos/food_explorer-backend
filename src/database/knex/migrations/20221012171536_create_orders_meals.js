exports.up = knex =>
  knex.schema.createTable("orders_meals", table => {
    table.increments("id");
    table.integer("order_id").references("id").inTable("orders");
    table.integer("meal_id").references("id").inTable("meals");
  });

exports.down = knex => knex.schema.dropTable("orders_meals");
