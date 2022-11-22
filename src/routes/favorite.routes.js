const { Router } = require("express");
const FavoritesControllers = require("../controllers/FavoritesControllers");
const ensuresThatTheMealIsRegistered = require("../middlewares/ensuresThatTheMealIsRegistered");
const ensureThatIsNotAnAdmin = require("../middlewares/ensureThatIsNotAnAdmin");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");

const routes = Router();
const favoritesControllers = new FavoritesControllers();

routes
  .post(
    "/:meal_id",
    ensureAuthenticated,
    ensureThatIsNotAnAdmin,
    ensuresThatTheMealIsRegistered,
    favoritesControllers.create
  )
  .get("/", ensureAuthenticated, favoritesControllers.index)
  .delete(
    "/:meal_id",
    ensureAuthenticated,
    ensureThatIsNotAnAdmin,
    favoritesControllers.delete
  );

module.exports = routes;
