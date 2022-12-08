const knex = require("../../database/knex");

class IngredientsRepository {
  async create({ name }) {
    const [ingredientId] = await knex("ingredients").insert({ name });

    return ingredientId;
  }

  async index() {
    const ingredients = await knex("ingredients").select();

    return ingredients;
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

  async findById(id) {
    const ingredient = await knex("ingredients").where({ id }).first();

    return ingredient;
  }

  async findByName(name) {
    const ingredient = await knex("ingredients").where({ name }).first();

    return ingredient;
  }

  async updateImage({ id, image }) {
    await knex("ingredients").update({ image }).where({ id });
  }
}

module.exports = IngredientsRepository;
