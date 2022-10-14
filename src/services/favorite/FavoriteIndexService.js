class FavoriteIndexService {
  constructor(favoriteRepository) {
    this.favoriteRepository = favoriteRepository;
  }

  async execute(user_id) {
    const favoritesOfThisUser = await this.favoriteRepository.index(user_id);

    return favoritesOfThisUser;
  }
}

module.exports = FavoriteIndexService;
