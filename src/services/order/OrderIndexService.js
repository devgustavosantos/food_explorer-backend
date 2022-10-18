class OrderIndexService {
  constructor(orderRepository) {
    this.orderRepository = orderRepository;
  }

  async execute({ user_id, accessLevel }) {
    let orders;

    if (accessLevel) {
      orders = await this.orderRepository.findAllOrders();
    } else {
      orders = await this.orderRepository.findAllOrdersFromASingleUser(user_id);
    }

    function formatOrders() {
      let singleOrders = [];

      orders.forEach(order => {
        const orderAlreadyRegistered = singleOrders.find(
          singleOrder => singleOrder.id === order.id
        );

        if (orderAlreadyRegistered) {
          return;
        }

        let mealsOfThisOrder = [];

        orders.forEach(item => {
          if (item.id === order.id) {
            mealsOfThisOrder = [
              {
                order_meal_id: item.order_meal_id,
                title: item.title,
                meal_amount: item.meal_amount,
              },
              ...mealsOfThisOrder,
            ];
          }
        });

        singleOrders = [
          {
            id: order.id,
            status: order.status,
            created_at: order.created_at,
            meals: mealsOfThisOrder,
          },
          ...singleOrders,
        ];
      });

      return singleOrders;
    }

    const ordersFormatted = formatOrders();

    return ordersFormatted;
  }
}

module.exports = OrderIndexService;
