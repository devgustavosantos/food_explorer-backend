exports.up = knex =>
  knex.schema.createTable("ingredients", table => {
    table.increments("id");
    table.text("name").notNullable();
    table.text("image").defaultTo(null);
  });

exports.down = knex => knex.schema.dropTable("ingredients");
