class MealIndexByTitleService {
  constructor(mealRepository) {
    this.mealRepository = mealRepository;
  }

  async execute({ title }) {
    let foundMeals;

    if (title) {
      foundMeals = this.mealRepository.findBySimilarTitle(title);
    } else {
      foundMeals = this.mealRepository.returnAll(title);
    }

    return foundMeals;
  }
}

module.exports = MealIndexByTitleService;
