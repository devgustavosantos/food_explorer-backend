const UserRepository = require("../repositories/user/UserRepository");
const UserCreateService = require("../services/user/UserCreateService");
const UserUpdateService = require("../services/user/UserUpdateService");

class UsersControllers {
  async create(request, response) {
    const { name, email, password } = request.body;

    const userRepository = new UserRepository();
    const userCreateService = new UserCreateService(userRepository);

    await userCreateService.execute({ name, email, password });

    return response.status(201).json();
  }

  async update(request, response) {
    const { name, email, old_password, new_password } = request.body;
    const user_id = request.user.id;

    const userRepository = new UserRepository();
    const userUpdateService = new UserUpdateService(userRepository);

    await userUpdateService.execute({
      id: user_id,
      name,
      email,
      old_password,
      new_password,
    });

    return response.status(201).json();
  }
}

module.exports = UsersControllers;
