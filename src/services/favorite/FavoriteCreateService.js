const AppError = require("../../utils/AppError");

class FavoriteCreateService {
  constructor(favoriteRepository) {
    this.favoriteRepository = favoriteRepository;
  }

  async execute({ user_id, meal_id }) {
    const favoriteAlreadyRegistered =
      await this.favoriteRepository.findByUserAndMeal({ user_id, meal_id });

    if (favoriteAlreadyRegistered) {
      throw new AppError("Este favorito já foi adicionado.");
    }

    await this.favoriteRepository.create({ user_id, meal_id });
  }
}

module.exports = FavoriteCreateService;
