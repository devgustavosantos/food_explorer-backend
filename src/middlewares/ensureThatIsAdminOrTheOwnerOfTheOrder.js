const AppError = require("../utils/AppError");
const UserRepository = require("../repositories/user/UserRepository");
const OrderRepository = require("../repositories/order/OrderRepository");

async function ensureThatIsAdminOrTheOwnerOfTheOrder(request, response, next) {
  const user_id = Number(request.query.user_id);
  const { order_id } = request.params;

  const userRepository = new UserRepository();
  const orderRepository = new OrderRepository();

  const user = await userRepository.findById(user_id);
  const order = await orderRepository.findById(order_id);

  if (!user || !order) {
    throw new AppError("Informações não encontradas.");
  }

  const thisOrderBelongsToThisUser = user.id === order.user_id;

  if (!user.is_admin && !thisOrderBelongsToThisUser) {
    throw new AppError("Acesso não autorizado.");
  }

  next();
}

module.exports = ensureThatIsAdminOrTheOwnerOfTheOrder;
