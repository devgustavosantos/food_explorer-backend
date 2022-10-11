require("dotenv/config");
const AppError = require("../../utils/AppError");
const { hash } = require("bcryptjs");

class UserCreateService {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async execute({ name, email, password }) {
    const allInformationHasBeenSent = name && email && password;

    if (!allInformationHasBeenSent) {
      throw new AppError(
        "Para fazer o cadastro, é necessário enviar todas as informações."
      );
    }

    const isEmailInUse = await this.userRepository.findByEmail(email);

    if (isEmailInUse) {
      throw new AppError(
        "Este e-mail já está em uso. Por favor escolha outro."
      );
    }

    console.log({ email, admin: process.env.ADMIN_EMAIL });

    const requiredAttributesForValidEmail = email
      .split("@")[1]
      .split("")
      .filter(char => char === ".").length;

    const isAValidEmail =
      requiredAttributesForValidEmail === 1 ||
      requiredAttributesForValidEmail === 2;

    if (!isAValidEmail) {
      throw new AppError("Este e-mail é inválido. Por favor escolha outro.");
    }

    const passwordHashed = await hash(password, 8);

    const itIsAnAdminEmail = email.includes(process.env.ADMIN_EMAIL);
    const is_admin = itIsAnAdminEmail ? true : false;

    await this.userRepository.create({
      name,
      email,
      password: passwordHashed,
      is_admin,
    });

    return "Successfully";
  }
}

module.exports = UserCreateService;
