import { FindManyOptions, getCustomRepository } from "typeorm";
import { CartsRepositories } from "../repositories/CartsRepositories";
import { Article } from "../entities/Article";
import { Cart } from "../entities/Cart";
import { instanceToPlain } from "class-transformer";
import { AddCartService } from "./AddCartService";
import { AddItemService } from "./AddItemService";
import { AddArticleService } from "./AddArticleServices";
import { ApplyDeliveryFee } from "./ApplyDeliveryFee";
import { ApplyDiscountArticleService } from "./ApplyDiscountArticleService";
import { CalculaTotalService } from "./CalculateTotal";

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
    const applyDiscountArticleService = new ApplyDiscountArticleService();
    const applyDeliveryFee = new ApplyDeliveryFee();
    const calculateTotalService = new CalculaTotalService();

    await addArticleService.execute(articles);
    await addCartService.execute(carts);
    await addItemService.execute(carts);

    const criteria: FindManyOptions<Cart> = {
      order: { id: "ASC" },
      relations: ["items", "items.article"],
    };

    let savedCarts = await cartsRepositories
      .find(criteria)
      .then((carts) => {
        calculateTotalService.execute(carts);
        return carts;
      })
      .then((carts) => {
        applyDiscountArticleService.execute(carts);
        return carts;
      })
      .then((carts) => {
        applyDeliveryFee.execute(carts);
        return carts;
      })
      .then((carts) => {
        calculateTotalService.execute(carts);
        return carts;
      });
    await cartsRepositories.save(savedCarts);

    return instanceToPlain({ carts: savedCarts });
  }
}

export { AddArticleAndCartService, IAddArticleAndCartRequest };
