import req from "supertest";
import server from "../src/server";
import connection from "../src/database";

beforeAll(async () => {
  await connection.create();
});

afterAll(async () => {
  await connection.close();
});

it("[POST] [400 Bad Request] Add Articles And Carts", async () => {
  const err = require("../src/json/erros/AddArticlesAndCartsErroDataFormat.json");
  await req(server)
    .post("/add_article_and_cart")
    .expect(400)
    .then((response) => {
      expect(response.body).toStrictEqual(err);
    });
});

it("[POST] [200 OK] Add Articles And Carts", async () => {
  const data = require("./json/data.json");
  const output = require("./json/output.json");
  await req(server)
    .post("/add_article_and_cart")
    .send(data)
    .expect(200)
    .then((response) => {
      expect(response.body).toStrictEqual(output);
    });
});
