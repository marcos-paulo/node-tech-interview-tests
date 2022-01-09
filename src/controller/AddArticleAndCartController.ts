import { Request, Response } from "express";
import { Article } from "../entities/Article";
import { Cart } from "../entities/Cart";
import { AddArticleAndCartService } from "../services/AddArticleAndCartService";

class Requisition {
  articles: Article[];
  carts: Cart[];
}

class AddArticleAndCartController {
  async handler(request: Request, response: Response) {
    const { articles, carts } = request.body;

    if (articles && carts) {
      const addArticleAndCartService = new AddArticleAndCartService();
      const cartsResponse = await addArticleAndCartService.execute({
        articles,
        carts,
      });
      return response.json(cartsResponse).status(200).end();
    }

    return response
      .status(400)
      .json(require("../json/erros/AddArticlesAndCartsErroDataFormat.json"));
  }
}

export { AddArticleAndCartController };
