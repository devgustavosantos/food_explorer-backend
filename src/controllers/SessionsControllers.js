const UserRepository = require("../repositories/user/UserRepository");
const SessionCreateService = require("../services/session/SessionCreateService");

class SessionsControllers {
  async create(request, response) {
    const { email, password } = request.body;

    const userRepository = new UserRepository();
    const sessionCreateService = new SessionCreateService(userRepository);

    const result = await sessionCreateService.execute({ email, password });

    return response.json(result);
  }
}

module.exports = SessionsControllers;
