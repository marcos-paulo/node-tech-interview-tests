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

    const addArticleAndCartService = new AddArticleAndCartService();
    const cartsResponse = await addArticleAndCartService.execute({
      articles,
      carts,
    });
    return response.json(cartsResponse).status(200).end();
  }
}

export { AddArticleAndCartController };
