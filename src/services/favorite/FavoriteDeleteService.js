const AppError = require("../../utils/AppError");

class FavoriteDeleteService {
  constructor(favoriteRepository) {
    this.favoriteRepository = favoriteRepository;
  }

  async execute({ user_id, meal_id }) {
    const favoriteInfos = await this.favoriteRepository.findByUserAndMeal({
      user_id,
      meal_id,
    });

    if (!favoriteInfos) {
      throw new AppError("Favorito não encontrado.");
    }

    await this.favoriteRepository.delete(favoriteInfos.id);
  }
}

module.exports = FavoriteDeleteService;
