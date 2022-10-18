const FavoriteRepository = require("../repositories/favorite/FavoriteRepository");
const FavoriteCreateService = require("../services/favorite/FavoriteCreateService");
const FavoriteIndexService = require("../services/favorite/FavoriteIndexService");
const FavoriteDeleteService = require("../services/favorite/FavoriteDeleteService");

class FavoritesControllers {
  async create(request, response) {
    const user_id = request.user.id;
    const { meal_id } = request.params;

    const favoriteRepository = new FavoriteRepository();
    const favoriteCreateService = new FavoriteCreateService(favoriteRepository);

    await favoriteCreateService.execute({ user_id, meal_id });

    return response.json();
  }

  async index(request, response) {
    const user_id = request.user.id;

    const favoriteRepository = new FavoriteRepository();
    const favoriteIndexService = new FavoriteIndexService(favoriteRepository);

    const result = await favoriteIndexService.execute(user_id);

    return response.json(result);
  }

  async delete(request, response) {
    const user_id = request.user.id;
    const { favorite_id } = request.params;

    const favoriteRepository = new FavoriteRepository();
    const favoriteDeleteService = new FavoriteDeleteService(favoriteRepository);

    await favoriteDeleteService.execute({ user_id, favorite_id });

    return response.json();
  }
}

module.exports = FavoritesControllers;
