const { Router } = require("express");
const userRoutes = require("./user.routes");
const mealRoutes = require("./meal.routes");
const ingredientRoutes = require("./ingredient.routes");
const favoriteRoutes = require("./favorite.routes");
const orderRoutes = require("./order.routes");

const routes = Router();

routes
  .use("/users", userRoutes)
  .use("/meals", mealRoutes)
  .use("/ingredients", ingredientRoutes)
  .use("/favorites", favoriteRoutes)
  .use("/orders", orderRoutes);

module.exports = routes;
