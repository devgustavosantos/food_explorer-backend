const knex = require("../../database/knex");

class UserRepositoryInMemory {
  async findByEmail(email) {
    const userInfos = await knex("users").where({ email }).first();

    return userInfos;
  }

  async create({ name, email, password, is_admin }) {
    await knex("users").insert({ name, email, password, is_admin });
  }
}

module.exports = UserRepositoryInMemory;
