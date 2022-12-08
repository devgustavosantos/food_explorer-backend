const AppError = require("../../utils/AppError");

class IngredientCreateService {
  constructor(ingredientRepository) {
    this.ingredientRepository = ingredientRepository;
  }

  async execute({ name }) {
    const isNameAlreadyInUse = await this.ingredientRepository.findByName(name);

    if (isNameAlreadyInUse) {
      throw new AppError("Este nome de ingrediente já está em uso.");
    }

    const ingredientId = await this.ingredientRepository.create({ name });

    const ingredientInfos = {
      id: ingredientId,
      name,
      image: null,
    };

    return ingredientInfos;
  }
}

module.exports = IngredientCreateService;
