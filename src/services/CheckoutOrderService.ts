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
      where: { id: cart_id },
      relations: ["items"],
    });

    if (!cart) throw new Error("Invalid Cart");
    if (cart.items.length <= 0) throw new Error("Cart is Empty");

    let orderCreated: Order;
    orderCreated = await ordersRepositories.save(ordersRepositories.create());
    cart.items.map((item) => {
      item.order_id = orderCreated.id;
    });

    if (!(await processPaymentService.execute(data_payment))) {
      await ordersRepositories.delete(orderCreated.id);
      throw new Error("Unable to process payment");
    }

    await itemsRepositories.save(cart.items);
    const result = await cartsRepositories.delete(cart_id);

    if (!(await processDeliveryService.execute(delivery_data)))
      throw new Error("Unable to process delivery");

    orderCreated.isFinished = true;
    orderCreated = await ordersRepositories.save(orderCreated);

    return {
      message:
        `payment for order ${orderCreated.id} has been successfully approved, ` +
        `You will receive in your email ${e_mail}, the confirmation of this order. ` +
        `you will receive your order the next day!`,
      order: orderCreated,
    };
  }
}

export { CheckoutOrderService };
