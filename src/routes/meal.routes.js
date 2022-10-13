const { Router } = require("express");
const MealsControllers = require("../controllers/MealsControllers");

const routes = Router();
const mealsControllers = new MealsControllers();

routes
  .post("/", mealsControllers.create)
  .get("/", mealsControllers.index)
  .get("/:id", mealsControllers.show)
  .put("/:id", mealsControllers.update)
  .delete("/:id", mealsControllers.delete);

module.exports = routes;
