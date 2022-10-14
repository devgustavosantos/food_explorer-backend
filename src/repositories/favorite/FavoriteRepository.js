const knex = require("../../database/knex");

class FavoriteRepository {
  async create({ user_id, meal_id }) {
    const favoriteCreated = await knex("favs").insert({ user_id, meal_id });

    return favoriteCreated;
  }

  async findByUserAndMeal({ user_id, meal_id }) {
    const favoriteInfos = await knex("favs")
      .where({ user_id, meal_id })
      .first();

    return favoriteInfos;
  }
}

module.exports = FavoriteRepository;
