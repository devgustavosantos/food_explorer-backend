const ImageUpdateService = require("../services/image/ImageUpdateService");
const IngredientRepository = require("../repositories/ingredients/IngredientRepository");
const uploadConfigs = require("../configs/upload");

class IngredientImageController {
  async update(request, response) {
    const { ingredient_id } = request.params;
    const imageFilename = request.file.filename;

    const ingredientRepository = new IngredientRepository();
    const imageUpdateService = new ImageUpdateService(ingredientRepository);

    const infosUpdated = await imageUpdateService.execute({
      id: ingredient_id,
      imageFilename,
      folder: uploadConfigs.INGREDIENTS_FOLDER,
    });

    return response.json(infosUpdated);
  }
}

module.exports = IngredientImageController;
