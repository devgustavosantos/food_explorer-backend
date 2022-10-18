class UserCheckIfIsAdmin {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async execute(userId) {
    const user = await this.userRepository.findById(userId);

    return user.is_admin;
  }
}

module.exports = UserCheckIfIsAdmin;
