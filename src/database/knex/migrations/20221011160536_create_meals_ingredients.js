exports.up = knex =>
  knex.schema.createTable("meals_ingredients", table => {
    table.increments("id");
    table
      .integer("meal_id")
      .references("id")
      .inTable("meals")
      .onDelete("CASCADE");

    table
      .integer("ingredient_id")
      .references("id")
      .inTable("ingredients")
      .onDelete("CASCADE");
  });

exports.down = knex => knex.schema.dropTable("meals_ingredients");
