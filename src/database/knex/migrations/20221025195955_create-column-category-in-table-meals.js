exports.up = knex =>
  knex.schema.alterTable("meals", table => {
    table.text("category");
  });

exports.down = knex =>
  knex.schema.alterTable("meals", table => {
    table.dropColumn("category");
  });
