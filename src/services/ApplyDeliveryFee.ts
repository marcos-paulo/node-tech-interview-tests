import { Cart } from "../entities/Cart";
import deliveryFees from "../json/conf/delivery_fees.json";
import discounts from "../json/conf/discounts.json";

class ApplyDeliveryFee {
  async execute(carts: Cart[]) {
    const { delivery_fees } = deliveryFees;
    carts.map((cart) => {
      const sum = cart.total! - cart.discount!;
      for (const {
        eligible_transaction_volume: { min_price, max_price },
        price,
      } of delivery_fees) {
        if (min_price && sum >= min_price) cart.delivery_fee = price;
        if (max_price && sum < max_price) {
          cart.delivery_fee = price;
          break;
        }
      }
    });
  }
}

export { ApplyDeliveryFee };
