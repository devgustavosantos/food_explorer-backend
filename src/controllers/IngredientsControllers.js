const UserRepository = require("../repositories/user/UserRepository");
const IngredientsRepository = require("../repositories/ingredients/IngredientsRepository");
const IngredientCreateService = require("../services/ingredient/IngredientCreateService");

class IngredientsControllers {
  async create(request, response) {
    const { name } = request.body;
    const user_id = Number(request.query.user_id);

    const userRepository = new UserRepository();
    const ingredientsRepository = new IngredientsRepository();
    const ingredientCreateService = new IngredientCreateService(
      userRepository,
      ingredientsRepository
    );

    await ingredientCreateService.execute({ user_id, name });
    return response.json();
  }
}

module.exports = IngredientsControllers;
