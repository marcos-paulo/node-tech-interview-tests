import {
  AddArticleAndCartService,
  IAddArticleAndCartRequest,
} from "../../src/services/AddArticleAndCartService";
import connection from "../../src/database";
import add_data from "../json/add_data";
import add_output from "../json/add_output";
beforeAll(async () => {
  await connection.create();
});

afterAll(async () => {
  await connection.close();
});

it("[AddArticleAndCartService]", async () => {
  const { articles, carts } = add_data;
  const addToCartService = new AddArticleAndCartService();
  const result = await addToCartService.execute({ articles, carts });

  expect(result).toMatchObject(add_output);
});
