const AppError = require("../../utils/AppError");
const { hash, compare } = require("bcryptjs");

class UserUpdateService {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async execute({ id, name, email, new_password, old_password }) {
    if (!name && !email && !new_password && !old_password) {
      throw new AppError("Nenhuma informação recebida.");
    }

    const oldInfos = await this.userRepository.findById(id);

    if (!oldInfos) {
      throw new AppError("Usuário não encontrado.");
    }

    let infosUpdated = JSON.parse(JSON.stringify(oldInfos));

    if (name) {
      infosUpdated.name = name;
    }

    if (email) {
      const isEmailInUse = await this.userRepository.findByEmail(email);

      if (isEmailInUse && isEmailInUse.id !== id) {
        throw new AppError("Este e-mail já esta em uso.");
      }

      infosUpdated.email = email;
    }

    if (new_password) {
      if (!old_password) {
        throw new AppError("Senha antiga não enviada.");
      }

      const isTheOldPasswordCorrect = await compare(
        old_password,
        infosUpdated.password
      );

      if (!isTheOldPasswordCorrect) {
        throw new AppError("Senha antiga está incorreta.");
      }

      const newPasswordHashed = await hash(new_password, 8);

      infosUpdated.password = newPasswordHashed;
    }

    await this.userRepository.update(infosUpdated);

    return "Successfully";
  }
}

module.exports = UserUpdateService;
