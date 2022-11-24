const AppError = require("../../utils/AppError");
const { compare } = require("bcryptjs");
const authConfigs = require("../../configs/auth");
const { sign } = require("jsonwebtoken");

class SessionCreateService {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async execute({ email, password }) {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new AppError("Usuário e/ou senha incorretos.");
    }

    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched) {
      throw new AppError("Usuário e/ou senha incorretos.");
    }

    const { secret, expiresIn } = authConfigs.jwt;
    const token = sign({}, secret, {
      subject: String(user.id),
      expiresIn,
    });

    const userWithoutSensitiveInformation = {
      name: user.name,
      email: user.email,
      isAdm: user.is_admin ? true : false,
    };

    return { user: userWithoutSensitiveInformation, token };
  }
}

module.exports = SessionCreateService;
