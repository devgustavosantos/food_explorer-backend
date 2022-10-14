const AppError = require("../utils/AppError");
const MealRepository = require("../repositories/meal/MealRepository");

async function ensuresThatTheMealIsRegistered(request, response, next) {
  const { meal_id } = request.params;

  const mealRepository = new MealRepository();

  const mealInfos = await mealRepository.findById(meal_id);

  if (!mealInfos) {
    throw new AppError("Este prato não está cadastrado.");
  }

  next();
}

module.exports = ensuresThatTheMealIsRegistered;
