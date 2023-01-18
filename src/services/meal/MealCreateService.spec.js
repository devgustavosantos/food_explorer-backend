const AppError = require("../../utils/AppError");
require("dotenv/config");

const MealRepositoryInMemory = require("../../repositories/meal/MealRepositoryInMemory");
const MealCreateService = require("./MealCreateService");

describe("MealCreateService", () => {
  let mealRepositoryInMemory;
  let mealCreateService;

  beforeEach(() => {
    mealRepositoryInMemory = new MealRepositoryInMemory();
    mealCreateService = new MealCreateService(mealRepositoryInMemory);
  });

  it("must register a meal successfully", async () => {
    const meal = {
      title: "Macarrão",
      description: "Um prato italiano",
      category: "Principais",
      price: "32.05",
    };

    const result = await mealCreateService.execute(meal);

    expect(result).toHaveProperty("id");
  });

  it("should return a 'title already registered' error", async () => {
    const meal = {
      title: "Macarrão",
      description: "Um prato italiano",
      category: "Principais",
      price: "32.05",
    };

    await mealCreateService.execute(meal);

    const mealWithTheSameTitle = meal;

    await expect(
      mealCreateService.execute(mealWithTheSameTitle)
    ).rejects.toEqual(new AppError("Este título já está em uso."));
  });
});
