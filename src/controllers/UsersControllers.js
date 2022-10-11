const AppError = require("../utils/AppError");
const knex = require("../database/knex");

class UsersControllers {
  async create(request, response) {
    const { name, email, password } = request.body;

    console.log(name, email, password);

    const isEmailInUse = await knex("users").where({ email }).first();

    console.log(isEmailInUse);

    if (!email) {
      throw new AppError("Email não foi informado!");
    }

    return response.status(201).json();
  }
}

module.exports = UsersControllers;
