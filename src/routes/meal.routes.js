const { Router } = require("express");
const MealsControllers = require("../controllers/MealsControllers");
const ensureThatIsAdmin = require("../middlewares/ensureThatIsAdmin");

const routes = Router();
const mealsControllers = new MealsControllers();

routes
  .post("/", ensureThatIsAdmin, mealsControllers.create)
  .get("/", mealsControllers.index)
  .get("/:id", mealsControllers.show)
  .put("/:id", ensureThatIsAdmin, mealsControllers.update)
  .delete("/:id", ensureThatIsAdmin, mealsControllers.delete);

module.exports = routes;
