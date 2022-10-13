const AppError = require("../../utils/AppError");

class MealCreateService {
  constructor(userRepository, mealRepository) {
    this.userRepository = userRepository;
    this.mealRepository = mealRepository;
  }

  async execute({ user_id, title, description, price }) {
    if (!user_id || !title || !description || !price) {
      throw new AppError(
        "Faltam dados necessário para cadastrar um novo prato."
      );
    }

    const usersInfos = await this.userRepository.findById(user_id);

    if (!usersInfos.is_admin) {
      throw new AppError(
        "Este usuário não tem permissão para cadastrar um novo prato."
      );
    }

    const isTheNameAlreadyRegistered = await this.mealRepository.findByTitle(
      title
    );

    if (isTheNameAlreadyRegistered) {
      throw new AppError("Este título já está em uso.");
    }

    const mealId = await this.mealRepository.create({
      title,
      description,
      price,
    });

    return mealId;
  }
}

module.exports = MealCreateService;
