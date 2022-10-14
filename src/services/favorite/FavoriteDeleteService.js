const AppError = require("../../utils/AppError");

class FavoriteDeleteService {
  constructor(favoriteRepository) {
    this.favoriteRepository = favoriteRepository;
  }

  async execute({ user_id, favorite_id }) {
    const favoriteInfos = await this.favoriteRepository.findById(favorite_id);

    if (!favoriteInfos) {
      throw new AppError("Favorito não encontrado.");
    }

    if (favoriteInfos.user_id !== user_id) {
      throw new AppError("Este favorito pertence a outro usuário.");
    }

    await this.favoriteRepository.delete(favorite_id);
  }
}

module.exports = FavoriteDeleteService;
