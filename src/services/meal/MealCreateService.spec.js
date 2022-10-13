const AppError = require("../../utils/AppError");
require("dotenv/config");

const UserRepositoryInMemory = require("../../repositories/user/UserRepositoryInMemory");
const UserCreateService = require("../user/UserCreateService");

const MealRepositoryInMemory = require("../../repositories/meal/MealRepositoryInMemory");
const MealCreateService = require("./MealCreateService");

describe("MealCreateService", () => {
  let userRepositoryInMemory;
  let userCreateService;

  let mealRepositoryInMemory;
  let mealCreateService;

  beforeEach(() => {
    userRepositoryInMemory = new UserRepositoryInMemory();
    userCreateService = new UserCreateService(userRepositoryInMemory);

    mealRepositoryInMemory = new MealRepositoryInMemory();
    mealCreateService = new MealCreateService(
      userRepositoryInMemory,
      mealRepositoryInMemory
    );
  });

  it("must register a meal successfully", async () => {
    const user = {
      name: "admin",
      email: `admin${process.env.ADMIN_EMAIL || "@admin.com"}`,
      password: "123",
    };

    const userRegistered = await userCreateService.execute(user);

    const meal = {
      user_id: userRegistered.id,
      title: "Macarrão",
      description: "Um prato italiano",
      price: "32.05",
    };

    const result = await mealCreateService.execute(meal);

    expect(result).toHaveProperty("id");
  });

  it("should return an 'unauthorized user' error", async () => {
    const user = {
      name: "admin",
      email: "test@email.com",
      password: "123",
    };

    const userRegistered = await userCreateService.execute(user);

    const meal = {
      user_id: userRegistered.id,
      title: "Macarrão",
      description: "Um prato italiano",
      price: "32.05",
    };

    await expect(mealCreateService.execute(meal)).rejects.toEqual(
      new AppError(
        "Este usuário não tem permissão para cadastrar um novo prato."
      )
    );
  });

  it("should return a 'title already registered' error", async () => {
    const user = {
      name: "admin",
      email: `admin${process.env.ADMIN_EMAIL || "@admin.com"}`,
      password: "123",
    };

    const userRegistered = await userCreateService.execute(user);

    const meal = {
      user_id: userRegistered.id,
      title: "Macarrão",
      description: "Um prato italiano",
      price: "32.05",
    };

    await mealCreateService.execute(meal);

    const mealWithTheSameTitle = meal;

    await expect(
      mealCreateService.execute(mealWithTheSameTitle)
    ).rejects.toEqual(new AppError("Este título já está em uso."));
  });
});
