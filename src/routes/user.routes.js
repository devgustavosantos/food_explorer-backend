const { Router } = require("express");

const UsersControllers = require("../controllers/UsersControllers");

const routes = Router();
const usersControllers = new UsersControllers();

routes.post("/", usersControllers.create);

module.exports = routes;
