const knex = require("../../database/knex");

class FavoriteRepository {
  async create({ user_id, meal_id }) {
    const favoriteCreated = await knex("favorites").insert({
      user_id,
      meal_id,
    });

    return favoriteCreated;
  }

  async index(user_id) {
    const favoritesMeals = await knex("meals")
      .select([
        "meals.id",
        "meals.title",
        "meals.description",
        "meals.price",
        "meals.image",
      ])
      .innerJoin("favorites", "favorites.meal_id", "meals.id")
      .where("favorites.user_id", user_id);

    return favoritesMeals;
  }

  async findById(id) {
    const favorite = await knex("favorites").where({ id }).first();

    return favorite;
  }

  async findByUserAndMeal({ user_id, meal_id }) {
    const favoriteInfos = await knex("favorites")
      .where({ user_id, meal_id })
      .first();

    return favoriteInfos;
  }

  async delete(id) {
    await knex("favorites").delete().where({ id });
  }
}

module.exports = FavoriteRepository;
