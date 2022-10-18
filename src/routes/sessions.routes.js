const { Router } = require("express");
const SessionsControllers = require("../controllers/SessionsControllers");

const routes = Router();
const sessionsControllers = new SessionsControllers();

routes.post("/", sessionsControllers.create);

module.exports = routes;
