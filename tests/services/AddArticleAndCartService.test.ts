import { AddArticleAndCartService } from "../../src/services/AddArticleAndCartService";
import connection from "../../src/database";

beforeAll(async () => {
  await connection.create();
});

afterAll(async () => {
  await connection.close();
});

it("[AddArticleAndCartService]", async () => {
  const { articles, carts } = require("../json/add_data.json");
  const addToCartService = new AddArticleAndCartService();
  const result = await addToCartService.execute({ articles, carts });
  const output = require("../json/add_output.json");
  expect(result).toEqual(output);
});
