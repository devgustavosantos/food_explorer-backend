const { Router } = require("express");
const UsersControllers = require("../controllers/UsersControllers");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");

const routes = Router();
const usersControllers = new UsersControllers();

routes
  .post("/", usersControllers.create)
  .put("/", ensureAuthenticated, usersControllers.update);

module.exports = routes;
