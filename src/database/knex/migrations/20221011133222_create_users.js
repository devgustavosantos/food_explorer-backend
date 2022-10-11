exports.up = knex =>
  knex.schema.createTable("users", table => {
    table.increments("id");
    table.text("name").notNullable();
    table.text("email").notNullable();
    table.text("password").notNullable();
    table.boolean("is_admin").defaultTo(false);
    table.timestamp("created_at").defaultTo(knex.fn.now());
  });

exports.down = knex => knex.schema.dropTable("users");
