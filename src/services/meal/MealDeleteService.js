class MealDeleteService {
  constructor(mealRepository) {
    this.mealRepository = mealRepository;
  }

  async execute(meal_id) {
    await this.mealRepository.delete(meal_id);
  }
}

module.exports = MealDeleteService;
