exports.up = knex =>
  knex.schema.createTable("favs", table => {
    table.increments("id");
    table
      .integer("user_id")
      .references("id")
      .inTable("users")
      .onDelete("CASCADE");
    table
      .integer("meal_id")
      .references("id")
      .inTable("meals")
      .onDelete("CASCADE");
  });

exports.down = knex => knex.schema.dropTable("favs");
