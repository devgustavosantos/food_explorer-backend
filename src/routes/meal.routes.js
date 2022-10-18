const { Router } = require("express");
const MealsControllers = require("../controllers/MealsControllers");
const ensureThatIsAdmin = require("../middlewares/ensureThatIsAdmin");
const ensuresThatTheMealIsRegistered = require("../middlewares/ensuresThatTheMealIsRegistered");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");

const routes = Router();
const mealsControllers = new MealsControllers();

routes
  .post("/", ensureAuthenticated, ensureThatIsAdmin, mealsControllers.create)
  .get("/", mealsControllers.index)
  .get("/:meal_id", ensuresThatTheMealIsRegistered, mealsControllers.show)
  .put(
    "/:meal_id",
    ensureAuthenticated,
    ensureThatIsAdmin,
    ensuresThatTheMealIsRegistered,
    mealsControllers.update
  )
  .delete(
    "/:meal_id",
    ensureAuthenticated,
    ensureThatIsAdmin,
    ensuresThatTheMealIsRegistered,
    mealsControllers.delete
  );

module.exports = routes;
