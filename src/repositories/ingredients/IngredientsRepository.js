const knex = require("../../database/knex");

class IngredientsRepository {
  async create({ name }) {
    await knex("ingredients").insert({ name });
  }

  async showIngredientsOfAMeal(meal_id) {
    const ingredients = await knex("ingredients")
      .select(["ingredients.id", "ingredients.name", "ingredients.image"])
      .innerJoin(
        "meals_ingredients",
        "meals_ingredients.ingredient_id",
        "ingredients.id"
      )
      .where("meals_ingredients.meal_id", meal_id);

    return ingredients;
  }

  async findByName(name) {
    const ingredient = await knex("ingredients").select().where({ name });

    return ingredient;
  }
}

module.exports = IngredientsRepository;
