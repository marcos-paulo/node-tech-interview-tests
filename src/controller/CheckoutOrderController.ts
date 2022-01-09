import { Request, Response } from "express";
import { CheckoutOrderService } from "../services/CheckoutOrderService";

class CheckoutOrderController {
  async handler(request: Request, response: Response) {
    const checkoutOrderService = new CheckoutOrderService();

    const { cart_id, e_mail, form_payment, data_payment, delivery_data } =
      request.body;

    const res = await checkoutOrderService.execute({
      cart_id,
      e_mail,
      form_payment,
      data_payment,
      delivery_data,
    });

    return response.json(res).end();
  }
}

export { CheckoutOrderController };
