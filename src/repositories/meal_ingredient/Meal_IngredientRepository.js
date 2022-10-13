const knex = require("../../database/knex");

class Meal_IngredientRepository {
  async create(mealsWithIngredients) {
    await knex("meals_ingredients").insert(mealsWithIngredients);
  }
}

module.exports = Meal_IngredientRepository;
