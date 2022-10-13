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

  async update({ id, title, description, price, updated_at }) {
    await knex("meals")
      .update({
        title,
        description,
        price,
        updated_at,
      })
      .where({ id });

    return;
  }

  async findById(id) {
    const mealInfos = await knex("meals").where({ id }).first();

    return mealInfos;
  }

  async findByTitle(title) {
    const mealInfos = await knex("meals").where({ title }).first();

    return mealInfos;
  }
}

module.exports = MealRepository;
