import { Cart } from "../entities/Cart";

class CalculaTotalService {
  async execute(carts: Cart[]) {
    carts.map((cart) => {
      let total = 0;
      cart.items.map(({ article, quantity }) => {
        const { price } = article!;
        total += price * quantity;
      });
      cart.total = total;
    });
  }
}

export { CalculaTotalService };
