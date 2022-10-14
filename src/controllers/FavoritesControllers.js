const FavoriteRepository = require("../repositories/favorite/FavoriteRepository");
const FavoriteCreateService = require("../services/favorite/FavoriteCreateService");

class FavoritesControllers {
  async create(request, response) {
    const user_id = Number(request.query.user_id);
    const { meal_id } = request.params;

    const favoriteRepository = new FavoriteRepository();
    const favoriteCreateService = new FavoriteCreateService(favoriteRepository);

    await favoriteCreateService.execute({ user_id, meal_id });

    return response.json({});
  }
}

module.exports = FavoritesControllers;
