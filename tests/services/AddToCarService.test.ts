import { AddToCartService } from "../../src/services/AddToCartService";
import connection from "../../src/database";

beforeAll(async () => {
  await connection.create();
});

afterAll(async () => {
  await connection.close();
});

it("[AddToCartService]", async () => {
  const { articles, carts } = require("../json/data.json");
  const addToCartService = new AddToCartService();
  const result = await addToCartService.execute({ articles, carts });
  const output = require("../json/output.json");
  expect(result).toEqual(output);
});
