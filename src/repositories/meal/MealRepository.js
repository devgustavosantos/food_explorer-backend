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

  async returnAll() {
    const meals = await knex("meals");

    return meals;
  }

  async findBySimilarTitle(title) {
    const meals = await knex("meals").whereLike("title", `%${title}%`);

    return meals;
  }

  async findById(id) {
    const mealInfos = await knex("meals").where({ id }).first();

    return mealInfos;
  }

  async findManyByIds(ids) {
    const mealInfos = await knex("meals").whereIn("id", ids);

    return mealInfos;
  }

  async findByTitle(title) {
    const mealInfos = await knex("meals").where({ title }).first();

    return mealInfos;
  }

  async update({ id, title, description, price }) {
    await knex("meals")
      .update({
        title,
        description,
        price,
      })
      .where({ id });

    return;
  }

  async updateImage({ id, image }) {
    await knex("meals").update({ image }).where({ id });
  }

  async delete(id) {
    await knex("meals").delete().where({ id });
  }
}

module.exports = MealRepository;
