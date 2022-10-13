const AppError = require("../utils/AppError");
const UserRepository = require("../repositories/user/UserRepository");

async function ensureThatIsAdmin(request, response, next) {
  const user_id = Number(request.query.user_id);

  const userRepository = new UserRepository();

  const userInfos = await userRepository.findById(user_id);

  if (!userInfos || !userInfos.is_admin) {
    throw new AppError("Usuário não autorizado.");
  }

  next();
}

module.exports = ensureThatIsAdmin;
