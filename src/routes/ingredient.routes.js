const { Router } = require("express");
const IngredientsControllers = require("../controllers/IngredientsControllers");
const ensureThatIsAdmin = require("../middlewares/ensureThatIsAdmin");
const routes = Router();
const ingredientsControllers = new IngredientsControllers();

routes.post("/", ensureThatIsAdmin, ingredientsControllers.create);

module.exports = routes;
