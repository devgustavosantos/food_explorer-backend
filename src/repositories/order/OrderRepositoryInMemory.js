class OrderRepositoryInMemory {
  meals = [];

  async create({ status, price, user_id }) {
    const generateTime = () => {
      const currentTime = new Date()
        .toISOString()
        .replace("Z", "")
        .replace("T", " ");

      const formattedTime = currentTime.substring(0, currentTime.length - 4);

      return formattedTime;
    };

    const order = {
      id: Math.floor(Math.random() * 1000),
      status,
      price,
      user_id,
      created_at: generateTime(),
    };

    this.meals.push(order);

    return order;
  }
}

module.exports = OrderRepositoryInMemory;
