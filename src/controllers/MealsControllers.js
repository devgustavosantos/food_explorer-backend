const UserRepository = require("../repositories/user/UserRepository");

const MealCreateService = require("../services/meal/MealCreateService");
const MealRepository = require("../repositories/meal/MealRepository");

const Meal_IngredientRepository = require("../repositories/meal_ingredient/Meal_IngredientRepository");
const Meal_IngredientCreateService = require("../services/meal_ingredient/Meal_IngredientCreateService");

class MealsControllers {
  async create(request, response) {
    const { title, description, price, ingredients } = request.body;
    const user_id = Number(request.query.user_id);

    const userRepository = new UserRepository();
    const mealRepository = new MealRepository();
    const mealCreateService = new MealCreateService(
      userRepository,
      mealRepository
    );

    const meal_IngredientRepository = new Meal_IngredientRepository();
    const meal_IngredientCreateService = new Meal_IngredientCreateService(
      meal_IngredientRepository
    );

    const mealId = await mealCreateService.execute({
      user_id,
      title,
      description,
      price,
    });

    await meal_IngredientCreateService.execute({ ingredients, mealId });

    return response.status(200).json();
  }
}

module.exports = MealsControllers;
