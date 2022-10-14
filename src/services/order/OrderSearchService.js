const AppError = require("../../utils/AppError");

class OrderSearchService {
  constructor(orderRepository) {
    this.orderRepository = orderRepository;
  }

  async execute(order_id) {
    const orderInfos = await this.orderRepository.findById(order_id);

    if (!orderInfos) {
      throw new AppError("Pedido não encontrado.");
    }

    return orderInfos;
  }
}

module.exports = OrderSearchService;
