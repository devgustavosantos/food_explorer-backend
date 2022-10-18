const MealImageUpdateService = require("../services/meal/MealImageUpdateService");
const MealRepository = require("../repositories/meal/MealRepository");

class MealImageController {
  async update(request, response) {
    const { meal_id } = request.params;
    const imageFilename = request.file.filename;

    const mealRepository = new MealRepository();
    const mealImageUpdateService = new MealImageUpdateService(mealRepository);

    await mealImageUpdateService.execute({
      meal_id,
      imageFilename,
    });

    return response.json({});
  }
}

module.exports = MealImageController;
