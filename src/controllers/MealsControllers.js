const UserRepository = require("../repositories/user/UserRepository");

const MealCreateService = require("../services/meal/MealCreateService");
const MealRepository = require("../repositories/meal/MealRepository");

const Meal_IngredientRepository = require("../repositories/meal_ingredient/Meal_IngredientRepository");
const Meal_IngredientCreateService = require("../services/meal_ingredient/Meal_IngredientCreateService");
const Meal_IngredientUpdateService = require("../services/meal_ingredient/Meal_IngredientUpdateService");

const MealUpdateService = require("../services/meal/MealUpdateService");

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

  async update(request, response) {
    const { title, description, price, ingredients } = request.body;
    const { id: meal_id } = request.params;
    const user_id = Number(request.query.user_id);

    const userRepository = new UserRepository();
    const mealRepository = new MealRepository();
    const mealUpdateService = new MealUpdateService(
      userRepository,
      mealRepository
    );

    const meal_IngredientRepository = new Meal_IngredientRepository();
    const meal_IngredientUpdateService = new Meal_IngredientUpdateService(
      meal_IngredientRepository
    );

    await mealUpdateService.execute({
      user_id,
      meal_id,
      title,
      description,
      price,
      ingredients,
    });

    await meal_IngredientUpdateService.execute({ meal_id, ingredients });

    return response.status(201).json();
  }
}

module.exports = MealsControllers;
