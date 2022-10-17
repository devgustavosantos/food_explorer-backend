const AppError = require("../../utils/AppError");

class MealIndexByIdService {
  constructor(mealRepository) {
    this.mealRepository = mealRepository;
  }

  async execute(meals) {
    const onlyIds = meals.map(order => order.meal_id);

    const foundMeals = await this.mealRepository.findManyByIds(onlyIds);

    const noMealFound = foundMeals.length === 0;

    if (noMealFound) {
      throw new AppError("Nenhum prato informado foi encontrado.");
    }

    return foundMeals;
  }
}

module.exports = MealIndexByIdService;
