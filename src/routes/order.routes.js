const { Router } = require("express");
const OrdersControllers = require("../controllers/OrdersControllers");
const ensureThatIsNotAnAdmin = require("../middlewares/ensureThatIsNotAnAdmin");

const routes = Router();
const ordersControllers = new OrdersControllers();

routes.post("/", ensureThatIsNotAnAdmin, ordersControllers.create);

module.exports = routes;
