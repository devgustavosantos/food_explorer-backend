const AppError = require("../../utils/AppError");

class MealUpdateService {
  constructor(userRepository, mealRepository) {
    this.userRepository = userRepository;
    this.mealRepository = mealRepository;
  }

  async execute({ user_id, meal_id, title, description, price, ingredients }) {
    if (
      !user_id ||
      !meal_id ||
      !title ||
      !description ||
      !price ||
      !ingredients
    ) {
      throw new AppError("Faltam dados para atualizar o prato.");
    }

    const usersInfos = await this.userRepository.findById(user_id);

    if (!usersInfos.is_admin) {
      throw new AppError(
        "Este usuário não tem permissão para cadastrar um novo prato."
      );
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

    const generateTime = () => {
      const currentTime = new Date()
        .toISOString()
        .replace("Z", "")
        .replace("T", " ");

      const formattedTime = currentTime.substring(0, currentTime.length - 4);

      return formattedTime;
    };

    let mealUpdated = mealInfos;
    mealUpdated.title = title;
    mealUpdated.description = description;
    mealUpdated.price = price;
    mealUpdated.updated_at = generateTime();

    await this.mealRepository.update(mealUpdated);
  }
}

module.exports = MealUpdateService;
