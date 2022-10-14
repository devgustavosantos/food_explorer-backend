const { Router } = require("express");
const FavoritesControllers = require("../controllers/FavoritesControllers");
const ensuresThatTheMealIsRegistered = require("../middlewares/ensuresThatTheMealIsRegistered");
const ensureThatIsNotAnAdmin = require("../middlewares/ensureThatIsNotAnAdmin");

const routes = Router();
const favoritesControllers = new FavoritesControllers();

routes
  .post(
    "/:meal_id",
    ensureThatIsNotAnAdmin,
    ensuresThatTheMealIsRegistered,
    favoritesControllers.create
  )
  .get("/", favoritesControllers.index)
  .delete("/:favorite_id", ensureThatIsNotAnAdmin, favoritesControllers.delete);

module.exports = routes;
