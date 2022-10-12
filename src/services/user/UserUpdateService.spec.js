const UserRepositoryInMemory = require("../../repositories/user/UserRepositoryInMemory");
const UserCreateService = require("../../services/user/UserCreateService");
const UserUpdateService = require("../../services/user/UserUpdateService");
const AppError = require("../../utils/AppError");

describe("UserUpdateService", () => {
  let userRepositoryInMemory;
  let userCreateService;
  let userUpdateService;

  beforeEach(() => {
    userRepositoryInMemory = new UserRepositoryInMemory();
    userCreateService = new UserCreateService(userRepositoryInMemory);
    userUpdateService = new UserUpdateService(userRepositoryInMemory);
  });

  it("must update a user successfully", async () => {
    const userOld = {
      name: "Test",
      email: "test@email.com",
      password: "123",
    };

    const userRegister = await userCreateService.execute(userOld);

    const userUpdated = {
      id: userRegister.id,
      name: "Test Updated",
      email: "test.updated@email.com",
      old_password: "123",
      new_password: "456",
    };

    const result = await userUpdateService.execute(userUpdated);

    expect(result).toEqual("Successfully");
  });

  it("should return an 'email in use' error", async () => {
    const user1 = {
      name: "Test",
      email: "test@email.com",
      password: "123",
    };

    await userCreateService.execute(user1);

    const user2 = {
      name: "Test 2",
      email: "test2@email.com",
      password: "456",
    };

    const userRegistered = await userCreateService.execute(user2);

    const user2Updated = {
      id: userRegistered.id,
      email: "test@email.com",
    };

    await expect(userUpdateService.execute(user2Updated)).rejects.toEqual(
      new AppError("Este e-mail já esta em uso.")
    );
  });

  it("should return an error of 'old password is wrong'", async () => {
    const oldUser = {
      name: "Test",
      email: "test@email.com",
      password: "123",
    };

    const userRegistered = await userCreateService.execute(oldUser);

    const userUpdated = {
      id: userRegistered.id,
      old_password: "abc",
      new_password: "456",
    };

    await expect(userUpdateService.execute(userUpdated)).rejects.toEqual(
      new AppError("Senha antiga está incorreta.")
    );
  });
});
