import { getCustomRepository } from "typeorm";
import { Order } from "../entities/Order";
import { CartsRepositories } from "../repositories/CartsRepositories";
import { ItemsRepositories } from "../repositories/ItemsRepositories";
import { OrdersRepositories } from "../repositories/OrdersRepositories";
import { IDelivery, ProcessDeliveryService } from "./ProcessDeliveryService";
import { IPayment, ProcessPaymentService } from "./ProcessPaymentService";

interface IOrder {
  cart_id: number;
  e_mail: string;
  form_payment: string;
  data_payment: IPayment;
  delivery_data: IDelivery;
}

class CheckoutOrderService {
  async execute(order_data: IOrder) {
    const { cart_id, e_mail, form_payment, data_payment, delivery_data } =
      order_data;
    const cartsRepositories = getCustomRepository(CartsRepositories);
    const ordersRepositories = getCustomRepository(OrdersRepositories);
    const itemsRepositories = getCustomRepository(ItemsRepositories);

    const processPaymentService = new ProcessPaymentService();
    const processDeliveryService = new ProcessDeliveryService();

    const [cart] = await cartsRepositories.find({
      where: {
        id: cart_id,
      },
      relations: ["items"],
    });

    let orderCreated: Order;
    if (cart) {
      if (cart.items.length > 0) {
        orderCreated = await ordersRepositories.save(
          ordersRepositories.create()
        );
        cart.items.map((item) => {
          item.order_id = orderCreated.id;
        });
        await itemsRepositories.save(cart.items);
      } else {
        throw new Error("Cart is Empty");
      }
    } else {
      throw new Error("Invalid Cart");
    }

    if (await processPaymentService.execute(data_payment)) {
      const result = await cartsRepositories.delete(cart_id);
      if (await processDeliveryService.execute(delivery_data)) {
        orderCreated.isFinished = true;
        orderCreated = await ordersRepositories.save(orderCreated);
      }
    }

    return {
      message:
        `payment for order ${orderCreated.id} has been successfully approved,` +
        `você receberá em seu e-mail ${e_mail}, a confirmação deste pedido.` +
        `you will receive your order the next day!`,
      order: orderCreated,
    };
  }
}

export { CheckoutOrderService };
