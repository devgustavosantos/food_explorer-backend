const AppError = require("../../utils/AppError");

class MealDeleteService {
  constructor(userRepository, mealRepository) {
    this.userRepository = userRepository;
    this.mealRepository = mealRepository;
  }

  async execute({ user_id, meal_id }) {
    const userInfos = await this.userRepository.findById(user_id);

    if (!userInfos) {
      throw new AppError("Usuário não autorizado!");
    }

    if (!userInfos.is_admin) {
      throw new AppError("Usuário não autorizado!");
    }

    await this.mealRepository.delete(meal_id);
  }
}

module.exports = MealDeleteService;
