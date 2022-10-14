exports.up = knex => knex.schema.renameTable("favs", "favorites");

exports.down = knex => knex.schema.renameTable("favorites", "favs");
