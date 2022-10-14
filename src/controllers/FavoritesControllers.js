const FavoriteRepository = require("../repositories/favorite/FavoriteRepository");
const FavoriteCreateService = require("../services/favorite/FavoriteCreateService");
const FavoriteDeleteService = require("../services/favorite/FavoriteDeleteService");

class FavoritesControllers {
  async create(request, response) {
    const user_id = Number(request.query.user_id);
    const { meal_id } = request.params;

    const favoriteRepository = new FavoriteRepository();
    const favoriteCreateService = new FavoriteCreateService(favoriteRepository);

    await favoriteCreateService.execute({ user_id, meal_id });

    return response.json();
  }

  async delete(request, response) {
    const user_id = Number(request.query.user_id);
    const { favorite_id } = request.params;

    const favoriteRepository = new FavoriteRepository();
    const favoriteDeleteService = new FavoriteDeleteService(favoriteRepository);

    await favoriteDeleteService.execute({ user_id, favorite_id });

    return response.json({});
  }
}

module.exports = FavoritesControllers;
