import { Article } from "../entities/Article";
import { Cart } from "../entities/Cart";

interface IAddToCartRequest {
  articles: Article[];
  carts: Cart[];
}

class AddToCartService {
  async execute({ articles, carts }: IAddToCartRequest) {
    carts.map((cart) => {
      cart.total = 0.0;
      cart.items.map((item) => {
        const article_id = item.article_id;
        for (let { id, price } of articles) {
          if (article_id === id) {
            cart.total += price;
          }
        }
      });
    });
    return { carts: carts };
  }
}
export { AddToCartService };
