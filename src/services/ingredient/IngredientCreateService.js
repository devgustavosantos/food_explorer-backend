const AppError = require("../../utils/AppError");

class IngredientCreateService {
  constructor(userRepository, ingredientRepository) {
    this.ingredientRepository = ingredientRepository;
  }

  async execute({ name }) {
    const isNameAlreadyInUse = this.ingredientRepository.findByName(name);

    if (isNameAlreadyInUse) {
      throw new AppError("Este nome de ingrediente já está em uso.");
    }

    await this.ingredientRepository.create(name);
  }
}

module.exports = IngredientCreateService;
