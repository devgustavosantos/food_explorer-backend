const AppError = require("../../utils/AppError");

class MealCreateService {
  constructor(mealRepository) {
    this.mealRepository = mealRepository;
  }

  async execute({ title, category, description, price }) {
    if (!title || !category || !description || !price) {
      throw new AppError(
        "Faltam dados necessário para cadastrar um novo prato."
      );
    }

    const isTheNameAlreadyRegistered = await this.mealRepository.findByTitle(
      title
    );

    if (isTheNameAlreadyRegistered) {
      throw new AppError("Este título já está em uso.");
    }

    if (isNaN(price)) {
      throw new AppError("O preço é inválido.");
    }

    const mealId = await this.mealRepository.create({
      title,
      category,
      description,
      price,
    });

    return mealId;
  }
}

module.exports = MealCreateService;
