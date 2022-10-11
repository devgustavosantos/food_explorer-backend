const UserRepository = require("../repositories/user/UserRepository");
const UserCreateService = require("../services/user/UserCreateService");

class UsersControllers {
  async create(request, response) {
    const { name, email, password } = request.body;

    const userRepository = new UserRepository();
    const userCreateService = new UserCreateService(userRepository);

    await userCreateService.execute({ name, email, password });

    return response.status(201).json();
  }
}

module.exports = UsersControllers;
