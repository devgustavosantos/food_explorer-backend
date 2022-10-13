const knex = require("../../database/knex");

class UserRepository {
  async create({ name, email, password, is_admin }) {
    await knex("users").insert({ name, email, password, is_admin });
  }

  async update(infosUpdated) {
    await knex("users").update(infosUpdated).where({ id: infosUpdated.id });
  }

  async findById(id) {
    const userInfos = await knex("users").where({ id }).first();

    return userInfos;
  }

  async findByEmail(email) {
    const userInfos = await knex("users").where({ email }).first();

    return userInfos;
  }
}

module.exports = UserRepository;
