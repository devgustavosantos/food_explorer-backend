class MealIngredientUpdateService {
  constructor(mealIngredientRepository) {
    this.mealIngredientRepository = mealIngredientRepository;
  }

  async execute({ meal_id, ingredients }) {
    await this.mealIngredientRepository.delete(meal_id);

    const ingredientsOfThisMeal = ingredients.map(ingredient => {
      return {
        meal_id,
        ingredient_id: ingredient.id,
      };
    });

    await this.mealIngredientRepository.create(ingredientsOfThisMeal);
  }
}

module.exports = MealIngredientUpdateService;
