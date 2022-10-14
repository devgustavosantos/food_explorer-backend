const { Router } = require("express");
const MealsControllers = require("../controllers/MealsControllers");
const ensureThatIsAdmin = require("../middlewares/ensureThatIsAdmin");
const ensuresThatTheMealIsRegistered = require("../middlewares/ensuresThatTheMealIsRegistered");

const routes = Router();
const mealsControllers = new MealsControllers();

routes
  .post("/", ensureThatIsAdmin, mealsControllers.create)
  .get("/", mealsControllers.index)
  .get("/:meal_id", ensuresThatTheMealIsRegistered, mealsControllers.show)
  .put(
    "/:meal_id",
    ensureThatIsAdmin,
    ensuresThatTheMealIsRegistered,
    mealsControllers.update
  )
  .delete(
    "/:meal_id",
    ensureThatIsAdmin,
    ensuresThatTheMealIsRegistered,
    mealsControllers.delete
  );

module.exports = routes;
