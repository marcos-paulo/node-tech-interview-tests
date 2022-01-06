import { Request, Response } from "express";
import { Article } from "../entities/Article";
import { AddToCartService } from "../service/AddToCartService";

class AddToCartController {
  async handler(request: Request, response: Response) {
    const { articles, carts } = request.body;
    const addToCartService = new AddToCartService();
    const cartsResponse = await addToCartService.execute({ articles, carts });
    return response.json(cartsResponse).status(200).end();
  }
}

export { AddToCartController };
