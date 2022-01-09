import { getCustomRepository } from "typeorm";
import { ArticlesRepositories } from "../repositories/ArticlesRepositories";
import { CartsRepositories } from "../repositories/CartsRepositories";
import { ItemsRepositories } from "../repositories/ItemsRepositories";
import { Article } from "../entities/Article";
import { Cart } from "../entities/Cart";
import { Item } from "../entities/Item";
import { instanceToPlain } from "class-transformer";
import dataFormat from "../json/erros/AddArticlesAndCartsErroDataFormat";

interface IAddArticleAndCartRequest {
  articles: Article[];
  carts: Cart[];
}

class AddArticleAndCartService {
  async execute({ articles, carts }: IAddArticleAndCartRequest) {
    const articlesRepositories = getCustomRepository(ArticlesRepositories);
    const cartsRepositories = getCustomRepository(CartsRepositories);
    const itemsRepositories = getCustomRepository(ItemsRepositories);

    if (!articles) throw new Error("Articles - not informed!");
    if (!carts) throw new Error("Carts - not informed!");

    let articlesArray = new Array<Article>();
    articles.map(({ id, name, price }) => {
      const newArticle = articlesRepositories.create({ id, name, price });
      articlesArray.push(newArticle);
    });
    await articlesRepositories.save(articlesArray);

    let cartsArray = new Array<Cart>();
    let itemsArray = new Array<Item>();
    carts.map(({ id, items }) => {
      cartsArray.push(cartsRepositories.create({ id }));
      items.map(({ article_id, quantity }) => {
        itemsArray.push(
          itemsRepositories.create({
            id: parseInt(`${id}${article_id}`),
            cart_id: id,
            article_id,
            quantity,
          })
        );
      });
    });

    await cartsRepositories.save(cartsArray);
    await itemsRepositories.save(itemsArray);

    const savedCarts = await cartsRepositories.find({
      order: { id: "ASC" },
      relations: ["items", "items.article"],
    });

    return instanceToPlain({ carts: savedCarts });
  }
}
export { AddArticleAndCartService, IAddArticleAndCartRequest };
