import { Cart } from "../entities/Cart";
import discountJson from "../json/conf/discounts.json";

class ApplyDiscountArticleService {
  async execute(carts: Cart[]) {
    const { discounts } = discountJson;
    for (const cart of carts) {
      cart.discount = 0;
      const { items } = cart;
      for (const { article_id: i_article_id, article, quantity } of items) {
        for (const discount of discounts) {
          const { article_id: d_article_id, type, value } = discount;
          if (i_article_id === d_article_id) {
            if (type === "amount") {
              cart.discount += value * quantity;
            }
            if (type === "percentage") {
              cart.discount += (value / 100) * article!.price * quantity;
            }
          }
        }
      }
    }
  }
}

export { ApplyDiscountArticleService };
