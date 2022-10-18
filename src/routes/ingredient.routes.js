const { Router } = require("express");
const IngredientsControllers = require("../controllers/IngredientsControllers");
const ensureThatIsAdmin = require("../middlewares/ensureThatIsAdmin");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");
const IngredientImageController = require("../controllers/IngredientImageController");
const multer = require("multer");
const uploadConfigs = require("../configs/upload");

const routes = Router();
const ingredientsControllers = new IngredientsControllers();
const ingredientImageController = new IngredientImageController();
const upload = multer(uploadConfigs.MULTER);

routes
  .post(
    "/",
    ensureAuthenticated,
    ensureThatIsAdmin,
    ingredientsControllers.create
  )
  .get("/", ingredientsControllers.index)
  .patch(
    "/:ingredient_id",
    ensureAuthenticated,
    ensureThatIsAdmin,
    upload.single("image"),
    ingredientImageController.update
  );

module.exports = routes;
