class UsersControllers {
  async create(request, response) {
    return response.status(201).json();
  }
}

module.exports = UsersControllers;
