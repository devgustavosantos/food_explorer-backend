const knex = require("../../database/knex");

class Meal_IngredientRepository {
  async create(mealsWithIngredients) {
    await knex("meals_ingredients").insert(mealsWithIngredients);
  }

  async delete(meal_id) {
    await knex("meals_ingredients").delete().where({ meal_id });
  }
}

module.exports = Meal_IngredientRepository;
