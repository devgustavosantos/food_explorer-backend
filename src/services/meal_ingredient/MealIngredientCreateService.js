class MealIngredientCreateService {
  constructor(mealIngredientRepository) {
    this.mealIngredientRepository = mealIngredientRepository;
  }

  async execute({ mealId, ingredients }) {
    const ingredientsOfThisMeal = ingredients.map(ingredient => {
      return {
        meal_id: mealId,
        ingredient_id: ingredient.id,
      };
    });

    await this.mealIngredientRepository.create(ingredientsOfThisMeal);
  }
}

module.exports = MealIngredientCreateService;
