const { Router } = require("express");
const OrdersControllers = require("../controllers/OrdersControllers");
const ensureThatIsNotAnAdmin = require("../middlewares/ensureThatIsNotAnAdmin");
const ensureThatIsAdmin = require("../middlewares/ensureThatIsAdmin");
const ensureThatIsAdminOrTheOwnerOfTheOrder = require("../middlewares/ensureThatIsAdminOrTheOwnerOfTheOrder");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");

const routes = Router();
const ordersControllers = new OrdersControllers();

routes
  .post(
    "/",
    ensureAuthenticated,
    ensureThatIsNotAnAdmin,
    ordersControllers.create
  )
  .get(
    "/:order_id",
    ensureAuthenticated,
    ensureThatIsAdminOrTheOwnerOfTheOrder,
    ordersControllers.show
  )
  .get("/", ensureAuthenticated, ordersControllers.index)
  .put("/", ensureAuthenticated, ensureThatIsAdmin, ordersControllers.update);

module.exports = routes;
