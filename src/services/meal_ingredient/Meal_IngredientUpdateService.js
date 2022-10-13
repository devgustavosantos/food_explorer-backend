class Meal_IngredientUpdateService {
  constructor(meal_ingredientRepository) {
    this.meal_ingredientRepository = meal_ingredientRepository;
  }

  async execute({ meal_id, ingredients }) {
    await this.meal_ingredientRepository.delete(meal_id);

    const ingredientsOfThisMeal = ingredients.map(ingredient => {
      return {
        meal_id,
        ingredient_id: ingredient.id,
      };
    });

    await this.meal_ingredientRepository.create(ingredientsOfThisMeal);
  }
}

module.exports = Meal_IngredientUpdateService;
