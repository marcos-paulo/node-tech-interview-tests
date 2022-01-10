import { FindManyOptions, getCustomRepository } from "typeorm";
import { CartsRepositories } from "../repositories/CartsRepositories";
import { Article } from "../entities/Article";
import { Cart } from "../entities/Cart";
import { instanceToPlain } from "class-transformer";
import { AddCartService } from "./AddCartService";
import { AddItemService } from "./AddItemService";
import { AddArticleService } from "./AddArticleServices";
import { ApplyDeliveryFee } from "./ApplyDeliveryFee";

interface IAddArticleAndCartRequest {
  articles: Article[];
  carts: Cart[];
}

class AddArticleAndCartService {
  async execute({ articles, carts }: IAddArticleAndCartRequest) {
    const cartsRepositories = getCustomRepository(CartsRepositories);

    const addArticleService = new AddArticleService();
    const addItemService = new AddItemService();
    const addCartService = new AddCartService();
    const applyDeliveryFee = new ApplyDeliveryFee();

    await addArticleService.execute(articles);
    await addCartService.execute(carts);
    await addItemService.execute(carts);

    const criteria: FindManyOptions<Cart> = {
      order: { id: "ASC" },
      relations: ["items", "items.article"],
    };
    const savedCarts = await cartsRepositories.find(criteria);
    await applyDeliveryFee.execute(savedCarts);
    await cartsRepositories.save(savedCarts);

    return instanceToPlain({ carts: savedCarts });
  }
}

export { AddArticleAndCartService, IAddArticleAndCartRequest };
