exports.up = knex =>
  knex.schema.alterTable("orders_meals", table => {
    table.integer("meal_amount");
  });

exports.down = knex =>
  knex.schema.alterTable("orders_meals", table => {
    table.dropColumn("meal_amount");
  });
