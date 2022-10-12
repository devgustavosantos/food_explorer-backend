class UserRepositoryInMemory {
  users = [];

  async create({ name, email, password, is_admin = false }) {
    const user = {
      id: Math.floor(Math.random() * 1000),
      name,
      email,
      password,
      is_admin,
    };

    this.users.push(user);

    return user;
  }

  async update(infosUpdated) {
    this.users = this.users.filter(user => user.id !== infosUpdated.id);
    this.users.push(infosUpdated);
  }

  async findById(id) {
    const userInfos = await this.users.find(user => user.id === id);

    return userInfos;
  }

  async findByEmail(email) {
    const userInfos = await this.users.find(user => user.email === email);

    return userInfos;
  }
}

module.exports = UserRepositoryInMemory;
