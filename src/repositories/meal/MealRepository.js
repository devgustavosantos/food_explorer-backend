const knex = require("../../database/knex");

class MealRepository {
  async create({ title, description, price }) {
    const registeredMeal = await knex("meals").insert({
      title,
      description,
      price,
    });

    return registeredMeal[0];
  }

  async findByTitle(title) {
    const mealInfos = await knex("meals").where({ title }).first();

    return mealInfos;
  }
}

module.exports = MealRepository;
