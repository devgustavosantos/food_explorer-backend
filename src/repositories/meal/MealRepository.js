const knex = require("../../database/knex");

class MealRepository {
  async create({ title, category, description, price }) {
    const registeredMeal = await knex("meals").insert({
      title,
      category,
      description,
      price,
    });

    return registeredMeal[0];
  }

  async returnAll() {
    const meals = await knex("meals");

    return meals;
  }

  async findBySearch(search) {
    const mealsInfos = [
      "meals.id",
      "meals.title",
      "meals.description",
      "meals.price",
      "meals.image",
      "meals.category",
    ];

    const searchByMealTitle = await knex("meals")
      .select(mealsInfos)
      .whereLike("title", `%${search}%`);

    const searchByIngredients = await knex("meals")
      .select(mealsInfos)
      .innerJoin("meals_ingredients", "meals_ingredients.meal_id", "meals.id")
      .innerJoin(
        "ingredients",
        "meals_ingredients.ingredient_id",
        "ingredients.id"
      )
      .whereLike("name", `%${search}%`);

    const searchResultWithoutDuplicateItems = [
      ...new Set(searchByMealTitle.concat(searchByIngredients)),
    ];

    return searchResultWithoutDuplicateItems;
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
