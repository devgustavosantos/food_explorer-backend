const OrderCreateService = require("./OrderCreateService");
const OrderRepositoryInMemory = require("../../repositories/order/OrderRepositoryInMemory");

describe("OrderCreateService", () => {
  it("must register order successfully", async () => {
    const user_id = 1;

    const meals = [
      {
        id: 1,
        price: 32.59,
      },
      {
        id: 2,
        price: 32.05,
      },
      {
        id: 3,
        price: 32.05,
      },
    ];

    const orderRepositoryInMemory = new OrderRepositoryInMemory();
    const orderCreateService = new OrderCreateService(orderRepositoryInMemory);

    const result = await orderCreateService.execute({
      user_id,
      meals,
    });

    expect(result).toHaveProperty("id");
  });
});
