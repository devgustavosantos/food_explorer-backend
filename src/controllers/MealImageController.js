const ImageUpdateService = require("../services/image/ImageUpdateService");
const MealRepository = require("../repositories/meal/MealRepository");
const uploadConfigs = require("../configs/upload");

class MealImageController {
  async update(request, response) {
    const { meal_id } = request.params;
    const imageFilename = request.file.filename;

    const mealRepository = new MealRepository();
    const imageUpdateService = new ImageUpdateService(mealRepository);

    await imageUpdateService.execute({
      id: meal_id,
      imageFilename,
      folder: uploadConfigs.MEALS_FOLDER,
    });

    return response.json();
  }
}

module.exports = MealImageController;
