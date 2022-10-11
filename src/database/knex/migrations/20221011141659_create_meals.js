exports.up = knex =>
  knex.schema.createTable("meals", table => {
    table.increments("id");
    table.text("title").notNullable();
    table.text("description");
    table.float("price").notNullable();
    table.text("image").defaultTo(null);
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
  });

exports.down = knex => knex.schema.dropTable("meals");
