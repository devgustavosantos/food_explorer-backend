const { Router } = require("express");
const MealsControllers = require("../controllers/MealsControllers");
const MealImageController = require("../controllers/MealImageController");
const ensureThatIsAdmin = require("../middlewares/ensureThatIsAdmin");
const ensuresThatTheMealIsRegistered = require("../middlewares/ensuresThatTheMealIsRegistered");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");
const multer = require("multer");
const uploadConfigs = require("../configs/upload");

const routes = Router();
const mealsControllers = new MealsControllers();
const mealImageController = new MealImageController();
const upload = multer(uploadConfigs.MULTER);

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
  .patch(
    "/:meal_id",
    ensureAuthenticated,
    ensureThatIsAdmin,
    ensuresThatTheMealIsRegistered,
    upload.single("image"),
    mealImageController.update
  )
  .delete(
    "/:meal_id",
    ensureAuthenticated,
    ensureThatIsAdmin,
    ensuresThatTheMealIsRegistered,
    mealsControllers.delete
  );

module.exports = routes;
