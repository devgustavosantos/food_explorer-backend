const { Router } = require("express");
const OrdersControllers = require("../controllers/OrdersControllers");
const ensureThatIsNotAnAdmin = require("../middlewares/ensureThatIsNotAnAdmin");
const ensureThatIsAdmin = require("../middlewares/ensureThatIsAdmin");

const routes = Router();
const ordersControllers = new OrdersControllers();

routes
  .post("/", ensureThatIsNotAnAdmin, ordersControllers.create)
  .put("/", ensureThatIsAdmin, ordersControllers.update);

module.exports = routes;
