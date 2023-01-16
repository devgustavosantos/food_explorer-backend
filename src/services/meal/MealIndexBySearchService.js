class MealIndexBySearchService {
  constructor(mealRepository) {
    this.mealRepository = mealRepository;
  }

  async execute(search) {
    let foundMeals;

    if (search) {
      foundMeals = this.mealRepository.findBySearch(search);
    } else {
      foundMeals = this.mealRepository.returnAll(search);
    }

    return foundMeals;
  }
}

module.exports = MealIndexBySearchService;
