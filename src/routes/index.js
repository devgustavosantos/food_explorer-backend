const { Router } = require("express");
const userRoutes = require("./user.routes");
const mealRoutes = require("./meal.routes");

const routes = Router();

routes.use("/users", userRoutes).use("/meals", mealRoutes);

module.exports = routes;
