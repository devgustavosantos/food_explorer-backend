class UserRepositoryInMemory {
  users = [];

  async findByEmail(email) {
    const userInfos = await this.users.find(user => user.email === email);

    return userInfos;
  }

  async create({ name, email, password, is_admin = false }) {
    const user = {
      id: Math.floor(Math.random() * 1000),
      name,
      email,
      password,
      is_admin,
    };

    this.users.push(user);
  }
}

module.exports = UserRepositoryInMemory;
