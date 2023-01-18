class MealRepositoryInMemory {
  meals = [];

  async create({ user_id, title, description, price }) {
    const meal = {
      id: Math.floor(Math.random() * 1000),
      user_id,
      title,
      description,
      price,
    };

    this.meals.push(meal);

    return meal;
  }

  async findById(id) {
    const mealInfos = this.meals.find((meal) => meal.id === id);

    return mealInfos;
  }

  async findByTitle(title) {
    const mealInfos = this.meals.find((meal) => meal.title === title);

    return mealInfos;
  }
}

module.exports = MealRepositoryInMemory;
