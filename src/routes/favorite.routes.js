const { Router } = require("express");
const FavoritesControllers = require("../controllers/FavoritesControllers");
const ensuresThatTheMealIsRegistered = require("../middlewares/ensuresThatTheMealIsRegistered");

const routes = Router();
const favoritesControllers = new FavoritesControllers();

routes
  .post(
    "/:meal_id",
    ensuresThatTheMealIsRegistered,
    favoritesControllers.create
  )
  .get("/", favoritesControllers.index)
  .delete("/:favorite_id", favoritesControllers.delete);

module.exports = routes;
