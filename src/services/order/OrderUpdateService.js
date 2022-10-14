const AppError = require("../../utils/AppError");

class OrderUpdateService {
  constructor(orderRepository) {
    this.orderRepository = orderRepository;
  }

  async execute({ order_id, status }) {
    const statusOptions = ["pending", "preparing", "delivered"];

    const receivedStatusIsValid = statusOptions.find(
      option => option === status
    );

    if (!receivedStatusIsValid) {
      throw new AppError("Este status não é permitido.");
    }

    await this.orderRepository.update({ order_id, status });
  }
}

module.exports = OrderUpdateService;
