const AppError = require("../../utils/AppError");

class MealUpdateService {
  constructor(mealRepository) {
    this.mealRepository = mealRepository;
  }

  async execute({ meal_id, title, description, price, ingredients }) {
    if (!meal_id || !title || !description || !price || !ingredients) {
      throw new AppError("Faltam dados para atualizar o prato.");
    }

    const mealInfos = await this.mealRepository.findById(meal_id);

    if (!mealInfos) {
      throw new AppError("Este prato não está cadastrado.");
    }

    const isTheNameAlreadyRegistered = await this.mealRepository.findByTitle(
      title
    );

    if (
      isTheNameAlreadyRegistered &&
      isTheNameAlreadyRegistered.id !== mealInfos.id
    ) {
      throw new AppError("Este título já está em uso por outro prato.");
    }

    if (isNaN(price)) {
      throw new AppError("O preço é inválido.");
    }

    const mealUpdated = {
      id: meal_id,
      title,
      description,
      price,
    };

    await this.mealRepository.update(mealUpdated);
  }
}

module.exports = MealUpdateService;
