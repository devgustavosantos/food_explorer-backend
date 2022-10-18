const { Router } = require("express");
const IngredientsControllers = require("../controllers/IngredientsControllers");
const ensureThatIsAdmin = require("../middlewares/ensureThatIsAdmin");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");

const routes = Router();
const ingredientsControllers = new IngredientsControllers();

routes
  .post(
    "/",
    ensureAuthenticated,
    ensureThatIsAdmin,
    ingredientsControllers.create
  )
  .get("/", ingredientsControllers.index);

module.exports = routes;
