import connection from "../../src/database";
import {
  AddArticleAndCartService,
  IAddArticleAndCartRequest,
} from "../../src/services/AddArticleAndCartService";
import { CheckoutOrderService } from "../../src/services/CheckoutOrderService";
import data from "../json/order_data";
import output from "../json/order_output";

import add_data from "../json/add_data";

beforeAll(async () => {
  await connection.create();
  const addToCartService = new AddArticleAndCartService();
  const { articles, carts } = add_data as IAddArticleAndCartRequest;
  await addToCartService.execute({ articles, carts });
});

afterAll(async () => {
  await connection.close();
});

it("[CheckoutOrderService]", async () => {
  const checkoutOrderService = new CheckoutOrderService();
  const result = await checkoutOrderService.execute(data);

  expect(result).toMatchObject(output);
});
