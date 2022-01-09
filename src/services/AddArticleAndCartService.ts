import { getCustomRepository } from "typeorm";
import { ArticlesRepositories } from "../Repositories/ArticlesRepositories";
import { CartsRepositories } from "../Repositories/CartsRepositories";
import { ItemsRepositories } from "../Repositories/ItemsRepositories";
import { Article } from "../entities/Article";
import { Cart } from "../entities/Cart";
import { Item } from "../entities/Item";
import { instanceToPlain } from "class-transformer";

interface IAddToCartRequest {
  articles: Article[];
  carts: Cart[];
}

class AddArticleAndCartService {
  async execute({ articles, carts }: IAddToCartRequest) {
    const articlesRepositories = getCustomRepository(ArticlesRepositories);
    let articlesArray = new Array<Article>();
    articles.map(({ id, name, price }) => {
      const newArticle = articlesRepositories.create({ id, name, price });
      articlesArray.push(newArticle);
    });
    const savedArticles = await articlesRepositories.save(articlesArray);

    const cartsRepositories = getCustomRepository(CartsRepositories);
    const itemsRepositories = getCustomRepository(ItemsRepositories);
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
      relations: ["items", "items.article"],
    });

    return instanceToPlain({ carts: savedCarts });
  }
}
export { AddArticleAndCartService };
