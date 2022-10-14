const AppError = require("../../utils/AppError");

class MealIndexByIdService {
  constructor(mealRepository) {
    this.mealRepository = mealRepository;
  }

  async execute(ids) {
    const meals = await this.mealRepository.findManyByIds(ids);

    const noMealFound = meals.length === 0;

    if (noMealFound) {
      throw new AppError("Nenhum prato informado foi encontrado.");
    }

    return meals;
  }
}

module.exports = MealIndexByIdService;
