const IngredientsRepository = require("../repositories/ingredients/IngredientRepository");

const MealRepository = require("../repositories/meal/MealRepository");
const MealCreateService = require("../services/meal/MealCreateService");
const MealUpdateService = require("../services/meal/MealUpdateService");
const MealIndexByTitleService = require("../services/meal/MealIndexByTitleService");
const MealShowService = require("../services/meal/MealShowService");
const MealDeleteService = require("../services/meal/MealDeleteService");

const Meal_IngredientRepository = require("../repositories/meal_ingredient/Meal_IngredientRepository");
const MealIngredientCreateService = require("../services/meal_ingredient/MealIngredientCreateService");
const MealIngredientUpdateService = require("../services/meal_ingredient/MealIngredientUpdateService");

class MealsControllers {
  async create(request, response) {
    const { title, description, price, ingredients } = request.body;

    const mealRepository = new MealRepository();
    const mealCreateService = new MealCreateService(mealRepository);

    const meal_IngredientRepository = new Meal_IngredientRepository();
    const mealIngredientCreateService = new MealIngredientCreateService(
      meal_IngredientRepository
    );

    const mealId = await mealCreateService.execute({
      title,
      description,
      price,
    });

    await mealIngredientCreateService.execute({ ingredients, mealId });

    return response.status(201).json();
  }

  async index(request, response) {
    const { title } = request.query;

    const mealRepository = new MealRepository();
    const mealIndexByTitleService = new MealIndexByTitleService(mealRepository);

    const result = await mealIndexByTitleService.execute({ title });
    return response.status(201).json(result);
  }

  async show(request, response) {
    const { meal_id } = request.params;

    const mealRepository = new MealRepository();
    const ingredientsRepository = new IngredientsRepository();
    const mealShowService = new MealShowService(
      mealRepository,
      ingredientsRepository
    );

    const result = await mealShowService.execute(meal_id);

    return response.status(201).json(result);
  }

  async update(request, response) {
    const { title, description, price, ingredients } = request.body;
    const { meal_id } = request.params;

    const mealRepository = new MealRepository();
    const mealUpdateService = new MealUpdateService(mealRepository);

    const meal_IngredientRepository = new Meal_IngredientRepository();
    const mealIngredientUpdateService = new MealIngredientUpdateService(
      meal_IngredientRepository
    );

    await mealUpdateService.execute({
      meal_id,
      title,
      description,
      price,
      ingredients,
    });

    await mealIngredientUpdateService.execute({ meal_id, ingredients });

    return response.status(201).json();
  }

  async delete(request, response) {
    const { meal_id } = request.params;

    const mealRepository = new MealRepository();
    const mealDeleteService = new MealDeleteService(mealRepository);

    await mealDeleteService.execute(meal_id);

    return response.status(201).json();
  }
}

module.exports = MealsControllers;
