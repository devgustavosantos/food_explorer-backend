class Meal_IngredientCreateService {
  constructor(meal_ingredientRepository) {
    this.meal_ingredientRepository = meal_ingredientRepository;
  }

  async execute({ mealId, ingredients }) {
    const ingredientsOfThisMeal = ingredients.map(ingredient => {
      return {
        meal_id: mealId,
        ingredient_id: ingredient.id,
      };
    });

    await this.meal_ingredientRepository.create(ingredientsOfThisMeal);
  }
}

module.exports = Meal_IngredientCreateService;
