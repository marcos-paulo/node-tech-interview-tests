import req from "supertest";
import server from "../src/server";
import connection from "../src/database";

import add_data from "./json/add_data";
import add_output from "./json/add_output";

import order_data from "./json/order_data";
import order_output from "./json/order_output";

import { Order } from "../src/entities/Order";

beforeAll(async () => {
  await connection.create();
});

afterAll(async () => {
  await connection.close();
});

it("[POST] [400 Bad Request] Add Articles And Carts", async () => {
  await req(server)
    .post("/add_article_and_cart")
    .expect(400)
    .then((response) => {});
});

it("[POST] [200 OK] Add Articles And Carts", async () => {
  await req(server)
    .post("/add_article_and_cart")
    .send(add_data)
    .expect(200)
    .then((response) => {
      expect(response.body).toStrictEqual(add_output);
    });
});

it("[POST] [200 OK] Checkout Order", async () => {
  await req(server)
    .post("/checkout_order")
    .send(order_data)
    .expect(200)
    .then((response) => {
      const resp = response.body as { message: String; order: Order };
      resp.order.created_at = new Date(resp.order.created_at);
      expect(resp).toMatchObject(order_output);
    });
});
